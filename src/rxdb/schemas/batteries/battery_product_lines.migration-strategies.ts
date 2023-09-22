import {MigrationStrategies} from "rxdb";
import {useAuthState} from "../../../firebase/auth.state.ts";

export const batteryProductLinesMigrationStrategies: MigrationStrategies = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    1: (oldDoc: any) => {
        return {
            ...oldDoc,
            owner_uid: useAuthState.getState().owner_uid,
        }
    }
};
