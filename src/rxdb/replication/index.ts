import {RxDBCollectionNames} from "../index.ts";
import {replicateFirestore, RxFirestoreReplicationState} from "rxdb/plugins/replication-firestore";
import {app, FIRESTORE_PROJECT_ID} from "../../firebase";
import {RxDatabase} from "rxdb";
import {collection, Firestore, getFirestore, DocumentData} from "firebase/firestore";
import {useAuthState} from "../../firebase/auth.state.ts";

async function initReplicationOfOneCollection(
    rxDbDatabase: RxDatabase,
    rxDbCollectionName: RxDBCollectionNames,
    firestoreDatabase: Firestore
) {
    const rxDbCollection = rxDbDatabase[rxDbCollectionName];
    if (!rxDbCollection) {
        console.warn(`Collection ${rxDbCollectionName} does not exist in rxDatabase ${rxDbDatabase.name}`);
        return;
    }

    const firestoreCollection = collection(firestoreDatabase, rxDbCollectionName);

    const replicationState = replicateFirestore(
        {
            collection: rxDbCollection,
            firestore: {
                projectId: FIRESTORE_PROJECT_ID,
                database: firestoreDatabase,
                collection: firestoreCollection,
            },
            pull: {},
            push: {},
            /**
             * Either do a live or a one-time replication
             * [default=true]
             */
            live: true,
            /**
             * (optional) likely you should just use the default.
             *
             * In firestore it is not possible to read out
             * the internally used write timestamp of a document.
             * Even if we could read it out, it is not indexed which
             * is required for fetch 'changes-since-x'.
             * So instead we have to rely on a custom user defined field
             * that contains the server time which is set by firestore via serverTimestamp()
             * IMPORTANT: The serverTimestampField MUST NOT be part of the collections RxJsonSchema!
             * [default='serverTimestamp']
             */
            serverTimestampField: 'serverTimestamp'
        }
    );

    replicationState.error$.subscribe((err) => {
        console.error(`Replication Error for collection ${rxDbCollectionName}: ${err}`);
    });

    await replicationState.awaitInitialReplication();

    return replicationState;
}

export async function initReplication(rxDbDatabase: RxDatabase) {
    console.log("Initializing replication");
    const firestoreDatabase = getFirestore(app);

    const replicationStates = new Map<RxDBCollectionNames, RxFirestoreReplicationState<DocumentData>>;
    for (const rxDbCollectionName of Object.values(RxDBCollectionNames)) {
        rxDbDatabase[rxDbCollectionName].preInsert((originalData) => {
            originalData.owner_uid = useAuthState.getState().owner_uid;
        }, false);

        const replicationState = await initReplicationOfOneCollection(
            rxDbDatabase,
            rxDbCollectionName,
            firestoreDatabase,
        );

        if (!replicationState) {
            console.warn(`Replication for collection ${rxDbCollectionName} could not be initialized`);
            continue;
        }

        replicationStates.set(rxDbCollectionName, replicationState);
    }

    return replicationStates;
}

export async function stopReplication(replicationStates: Map<RxDBCollectionNames, RxFirestoreReplicationState<DocumentData>>) {
    console.log("Stopping replication");
    for (const replicationState of replicationStates.values()) {
        await replicationState.cancel();
    }
}
