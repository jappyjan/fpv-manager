import {useCallback, useEffect, useMemo, useState} from "react";
import {RxDBCollectionNames} from "../rxdb";
import {RxDatabase, RxDocument} from "rxdb";
import {getAuth, User} from "firebase/auth";
import {app} from "./index.ts";

export interface AuthStore {
    owner_uid: string;
    updateOwnerUid: (owner_uid: string) => void;
}

let cachedOwnerUid = localStorage.getItem('owner_uid') || ''

if (!cachedOwnerUid) {
    cachedOwnerUid = '__not_set__';
    localStorage.setItem('owner_uid', cachedOwnerUid);
}

export function useAuthStore(rxDb: RxDatabase | null) {
    const firebaseAuth = useMemo(() => getAuth(app), []);

    const updateOwnerUidInDocuments = useCallback(async (owner_uid: string) => {
        console.log("updating owner_uid", owner_uid);
        if (!rxDb) {
            throw new Error("rxDb is not initialized");
        }

        for (const collectionName of Object.values(RxDBCollectionNames)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const allDocuments: RxDocument<{owner_uid: string}>[] = await rxDb[collectionName].find().exec();
            for (const document of allDocuments) {
                await rxDb[collectionName].upsert({
                    ...document._data,
                    owner_uid,
                });
            }
        }
    }, [rxDb]);

    const [user, setUser] = useState<User | null>(null);

    const ownerUid = useMemo(() => {
        return user?.uid || cachedOwnerUid;
    }, [user]);

    useEffect(() => {
        updateOwnerUidInDocuments(ownerUid);
    }, [ownerUid, updateOwnerUidInDocuments]);

    const isAuthenticated = useMemo(() => !!user, [user]);

    const onAuthStateChanged = useCallback(async (user: User | null) => {
        setUser(user);
    }, [setUser]);

    useEffect(() => {
        const unsubscribe = firebaseAuth.onAuthStateChanged(onAuthStateChanged);
        return () => unsubscribe();
    }, [onAuthStateChanged, firebaseAuth]);

    return {
        updateOwnerUid: updateOwnerUidInDocuments,
        firebaseAuth,
        isAuthenticated,
        user,
        ownerUid,
    };
}
