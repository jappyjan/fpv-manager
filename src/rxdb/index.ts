import {createRxDatabase} from "rxdb";
import {getRxStorageDexie} from "rxdb/plugins/storage-dexie";
import {addRxPlugin} from 'rxdb';
import {RxDBDevModePlugin} from 'rxdb/plugins/dev-mode';
import {BatterySchema} from "./schemas/batteries/batteries.schema.ts";
import {BatteryProductLineSchema} from "./schemas/batteries/battery_product_lines.schema.ts";
import {ManufacturerSchema} from "./schemas/manufacturers/manufacturer.schema.ts";
import {RxDBQueryBuilderPlugin} from "rxdb/plugins/query-builder";


export enum RxDBCollectionNames {
    BATTERIES = 'batteries',
    BATTERY_PRODUCT_LINES = 'battery_product_lines',
    MANUFACTURERS = 'manufacturers',
}

export async function init() {
    const database = await createRxDatabase({
        name: 'inventory',
        storage: getRxStorageDexie(),
        eventReduce: true,
    });

// if in dev mode, enable the dev mode plugin
    if (process.env.NODE_ENV !== 'production') {
        addRxPlugin(RxDBDevModePlugin);
    }

    addRxPlugin(RxDBQueryBuilderPlugin);

    await database.addCollections({
        [RxDBCollectionNames.BATTERIES]: {
            schema: BatterySchema,
        },
        [RxDBCollectionNames.BATTERY_PRODUCT_LINES]: {
            schema: BatteryProductLineSchema,
        },
        [RxDBCollectionNames.MANUFACTURERS]: {
            schema: ManufacturerSchema,
        }
    });

    return database;
}