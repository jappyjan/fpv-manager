import {addRxPlugin, createRxDatabase} from 'rxdb';
import {RxDBDevModePlugin} from 'rxdb/plugins/dev-mode';
import {BatterySchema} from "./schemas/batteries/batteries.schema.ts";
import {BatteryProductLineSchema} from "./schemas/batteries/battery_product_lines.schema.ts";
import {BatteryManufacturersSchema} from "./schemas/batteries/battery_manufacturers.schema.ts";
import {RxDBQueryBuilderPlugin} from "rxdb/plugins/query-builder";
import {RxDBCleanupPlugin} from 'rxdb/plugins/cleanup';
import {RxDBMigrationPlugin} from 'rxdb/plugins/migration';
import {batteryMigrationStrategies} from "./schemas/batteries/batteries.migration-strategies.ts";
import {
    batteryProductLinesMigrationStrategies
} from "./schemas/batteries/battery_product_lines.migration-strategies.ts";
import {
    batteryManufacturersMigrationStrategies
} from "./schemas/batteries/battery_manufacturers.migration-strategies.ts";
import {getRxStorageDexie} from "rxdb/plugins/storage-dexie";
import {RxDBLeaderElectionPlugin} from 'rxdb/plugins/leader-election';
import {RxDBName} from "./constants.ts";
import { RxDBJsonDumpPlugin } from 'rxdb/plugins/json-dump';


// if in dev mode, enable the dev mode plugin
if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    addRxPlugin(RxDBDevModePlugin);
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
addRxPlugin(RxDBQueryBuilderPlugin);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
addRxPlugin(RxDBCleanupPlugin);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
addRxPlugin(RxDBMigrationPlugin);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
addRxPlugin(RxDBLeaderElectionPlugin);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
addRxPlugin(RxDBJsonDumpPlugin);

export enum RxDBCollectionNames {
    BATTERIES = 'batteries',
    BATTERY_PRODUCT_LINES = 'battery_product_lines',
    BATTERY_MANUFACTURERS = 'battery_manufacturers',
}

async function initDatabase() {
    const database = await createRxDatabase({
        name: RxDBName,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        storage: getRxStorageDexie(),
        eventReduce: true,
        cleanupPolicy: {
            minimumDeletedTime: 1000 * 60 * 60 * 24 * 31, // one month,
            minimumCollectionAge: 1000 * 60, // 60 seconds
            runEach: 1000 * 60 * 15, // 15 minutes
            awaitReplicationsInSync: true,
            waitForLeadership: true
        }
    });

    await database.addCollections({
        [RxDBCollectionNames.BATTERIES]: {
            schema: BatterySchema,
            migrationStrategies: batteryMigrationStrategies,
        },
        [RxDBCollectionNames.BATTERY_PRODUCT_LINES]: {
            schema: BatteryProductLineSchema,
            migrationStrategies: batteryProductLinesMigrationStrategies
        },
        [RxDBCollectionNames.BATTERY_MANUFACTURERS]: {
            schema: BatteryManufacturersSchema,
            migrationStrategies: batteryManufacturersMigrationStrategies
        }
    });

    return database;
}

export async function init() {
    return await initDatabase();
}
