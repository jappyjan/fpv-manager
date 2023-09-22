import {collection, doc, getDoc, getFirestore, DocumentReference, setDoc, DocumentData} from "firebase/firestore";
import {User} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {useAuthStore} from "./auth.state.ts";
import ShortUniqueId from "short-unique-id";
import {useCallback, useEffect, useMemo, useState} from "react";
import {RxDatabase} from "rxdb";
import {initReplication, stopReplication} from "../rxdb/replication";
import {RxFirestoreReplicationState} from "rxdb/plugins/replication-firestore";
import {RxDBCollectionNames} from "../rxdb";

export const FIRESTORE_PROJECT_ID = "fvp-manager"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC9AgAn1H-ufCMMGEVl1ipIDP-ml-HeB1g",
    authDomain: "fvp-manager.firebaseapp.com",
    projectId: FIRESTORE_PROJECT_ID,
    storageBucket: "fvp-manager.appspot.com",
    messagingSenderId: "65900746415",
    appId: "1:65900746415:web:437c649ced6cf24312665a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export function useSetupFirebase(rxDb: RxDatabase | null) {
    const {updateOwnerUid, user, owner_uid} = useAuthStore(rxDb);

    const firestoreDatabase = useMemo(() => getFirestore(app), []);
    const firestoreCollection = useMemo(() => collection(firestoreDatabase, '_users'), [firestoreDatabase]);

    const createUserDocument = useCallback(async (docRef: DocumentReference) => {
        try {
            console.log("creating user document");
            await setDoc(docRef, {
                owner_uid: new ShortUniqueId().rnd(16),
            });
        } catch (e) {
            console.error("error creating user document", e, docRef);
        }
    }, []);

    const onAuthUserChanged = useCallback(async (user: User | null) => {
        console.log("auth state changed", user);
        if (!user) {
            return;
        }

        console.log("user is logged in, checking if user document exists");
        const userDocRef = doc(firestoreCollection, user.uid);
        let userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            console.log("user document does not exist, creating");
            await createUserDocument(userDocRef);
            userDoc = await getDoc(userDocRef);
        }

        const userDocData = userDoc.data();

        if (!userDocData?.owner_uid) {
            throw new Error(`User document ${userDoc.id} does not have a uid field`);
        }

        console.log("user document exists");
        if (owner_uid !== userDocData.owner_uid) {
            console.log("updating owner uid");
            await updateOwnerUid(userDocData.owner_uid);
        }
    }, [createUserDocument, firestoreCollection, updateOwnerUid]);

    useEffect(() => {
        onAuthUserChanged(user);
    }, [onAuthUserChanged, user]);

    const [replicationStates, setReplicationState] = useState<Map<RxDBCollectionNames, RxFirestoreReplicationState<DocumentData>> | null>(null);

    const startReplication = useCallback(async () => {
        if (!rxDb) {
            return;
        }

        const nextReplicationStates = await initReplication(rxDb);
        setReplicationState(nextReplicationStates);
    }, [rxDb]);

    useEffect(() => {
        if (replicationStates && !user) {
            stopReplication(replicationStates);
            setReplicationState(null);
            return;
        }

        if (!replicationStates && user && owner_uid !== '__not_set__') {
            console.log("starting replication", owner_uid);
            startReplication();
        }
    }, [user, replicationStates, startReplication, owner_uid]);

}
