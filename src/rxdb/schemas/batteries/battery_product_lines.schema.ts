import {RxJsonSchema} from "rxdb";
import {BatteryManufacturer} from "./battery_manufacturers.schema.ts";
import ShortUniqueId from "short-unique-id";
import {ReplicatedDocument} from "./replicated-document.ts";

export interface BatteryProductLine {
    manufacturer_id: BatteryManufacturer['id'];
    id: string;
    name: string;
}

export const batteryProductLineIdGenerator = new ShortUniqueId({
    length: 5,
    dictionary: 'hex'
});

export const BatteryProductLineSchema: RxJsonSchema<BatteryProductLine & ReplicatedDocument> = {
    version: 1,
    primaryKey: 'id',
    type: 'object',
    properties: {
        manufacturer_id: {
            type: 'string',
        },
        id: {
            type: 'string',
            maxLength: 5
        },
        name: {
            type: 'string',
        },
        owner_uid: {
            type: 'string',
            final: true,
        }
    },
    required: ['id', 'name', 'owner_uid'],
}
