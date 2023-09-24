import {MigrationStrategies} from "rxdb";

export const batteryManufacturersMigrationStrategies: MigrationStrategies = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    1: (oldDoc: any) => {
        return {
            ...oldDoc,
            owner_uid: '__not_set__',
        }
    },
    2: (oldDoc: unknown) => oldDoc,
};
