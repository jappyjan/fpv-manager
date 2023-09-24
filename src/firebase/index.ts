import {DocumentData} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {useAuthStore} from "./auth.state.ts";
import {useCallback, useEffect, useState} from "react";
import {RxDatabase} from "rxdb";
import {initReplication, stopReplication} from "../rxdb/replication";
import {RxFirestoreReplicationState} from "rxdb/plugins/replication-firestore";
import {RxDBCollectionNames} from "../rxdb";

export const FIREBASE_PROJECT_ID = "fvp-manager"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC9AgAn1H-ufCMMGEVl1ipIDP-ml-HeB1g",
    authDomain: "fvp-manager.firebaseapp.com",
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: "fvp-manager.appspot.com",
    messagingSenderId: "65900746415",
    appId: "1:65900746415:web:437c649ced6cf24312665a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export function useSetupFirebase(rxDb: RxDatabase | null) {
    const {user, ownerUid, updateOwnerUid} = useAuthStore(rxDb);

    const [replicationStates, setReplicationState] = useState<Map<RxDBCollectionNames, RxFirestoreReplicationState<DocumentData>> | null>(null);

    const startReplication = useCallback(async () => {
        if (!rxDb) {
            return;
        }

        const nextReplicationStates = await initReplication(ownerUid, rxDb);
        setReplicationState(nextReplicationStates);
    }, [ownerUid, rxDb]);

    useEffect(() => {
        updateOwnerUid(ownerUid);
    }, [ownerUid, updateOwnerUid]);

    useEffect(() => {
        if (replicationStates && !user) {
            stopReplication(replicationStates);
            setReplicationState(null);
            return;
        }

        if (!replicationStates && user && ownerUid !== '__not_set__') {
            console.log("starting replication", ownerUid);
            startReplication();
        }

        return () => {
            if (replicationStates) {
                stopReplication(replicationStates);
            }
        }
    }, [user, replicationStates, startReplication, ownerUid]);

}
