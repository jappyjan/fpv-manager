import {MigrationStrategies} from "rxdb";
import {useAuthState} from "../../../firebase/auth.state.ts";

export const batteryManufacturersMigrationStrategies: MigrationStrategies = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    1: (oldDoc: any) => {
        return {
            ...oldDoc,
            owner_uid: useAuthState.getState().owner_uid,
        }
    },
    2: (oldDoc: unknown) => oldDoc,
};
