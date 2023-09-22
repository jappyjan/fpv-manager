import {MigrationStrategies} from "rxdb";
import {useAuthState} from "../../../firebase/auth.state.ts";

export const batteryMigrationStrategies: MigrationStrategies = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    1: (oldDoc: any) => {
        return {
            id: oldDoc.id,
            product_line_id: oldDoc.product_line_id,
            bought_at: new Date().toISOString(),
        }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    2: (oldDoc: any) => {
        return {
            ...oldDoc,
            owner_uid: useAuthState.getState().owner_uid,
        }
    }
};
