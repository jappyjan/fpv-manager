import {create} from 'zustand';
import {useCallback, useEffect, useMemo, useState} from "react";
import {RxDBCollectionNames} from "../rxdb";
import {RxDatabase, RxDocument} from "../../../rxdb";
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

export const useAuthState = create<AuthStore>((set) => ({
    owner_uid: cachedOwnerUid,
    updateOwnerUid: (owner_uid: string) => {
        set({owner_uid});
    }
}));

export function useAuthStore(rxDb: RxDatabase | null) {
    const authState = useAuthState();
    const firebaseAuth = useMemo(() => getAuth(app), []);

    const updateOwnerUid = useCallback(async (owner_uid: string) => {
        if (!rxDb) {
            throw new Error("rxDb is not initialized");
        }

        for (const collectionName of Object.values(RxDBCollectionNames)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const allDocuments: RxDocument<{owner_uid: string}>[] = await rxDb[collectionName].find().exec();
            for (const document of allDocuments) {
                document.owner_uid = owner_uid;
                await document.save();
            }
        }

        authState.updateOwnerUid(owner_uid);
    }, [authState, rxDb]);

    const [user, setUser] = useState<User | null>(null);

    const isAuthenticated = useMemo(() => !!user, [user]);

    const onAuthStateChanged = useCallback(async (user: User | null) => {
        setUser(user);
    }, [setUser]);

    useEffect(() => {
        const unsubscribe = firebaseAuth.onAuthStateChanged(onAuthStateChanged);
        return () => unsubscribe();
    }, [onAuthStateChanged, firebaseAuth]);

    return {
        ...authState,
        updateOwnerUid,
        firebaseAuth,
        isAuthenticated,
        user,
    };
}
