import {RxDBCollectionNames} from "../index.ts";
import {replicateFirestore} from "rxdb/plugins/replication-firestore";
import {FIRESTORE_PROJECT_ID, firestoreCollection, firestoreDatabase} from "../../firestore";
import {RxDatabase} from "rxdb";

async function initReplicationOfOneCollection(database: RxDatabase, collectionName: RxDBCollectionNames) {
    const collection = database[collectionName];
    if (!collection) {
        console.warn(`Collection ${collectionName} does not exist in database ${database.name}`);
        return;
    }

    const replicationState = replicateFirestore(
        {
            collection,
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
        console.error(`Replication Error for collection ${collectionName}: ${err}`);
    });

    await replicationState.awaitInitialReplication();
}

export async function initReplication(database: RxDatabase) {
    for (const collectionName of Object.values(RxDBCollectionNames)) {
        await initReplicationOfOneCollection(database, collectionName);
    }
}
