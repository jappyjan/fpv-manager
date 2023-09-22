import {RxJsonSchema} from "rxdb";
import {BatteryProductLine} from "./battery_product_lines.schema.ts";
import ShortUniqueId from "short-unique-id";

export interface Battery {
    product_line_id: BatteryProductLine['id'];
    id: string;
    bought_at: string;
    owner_uid: string;
}

export const batteryIdGenerator = new ShortUniqueId({
    length: 5,
    dictionary: 'hex'
});

export const BatterySchema: RxJsonSchema<Battery> = {
    version: 2,
    primaryKey: 'id',
    type: 'object',
    properties: {
        product_line_id: {
            type: 'string',
        },
        id: {
            type: 'string',
            maxLength: 5
        },
        bought_at: {
            type: 'string',
            final: true,
        },
        owner_uid: {
            type: 'string',
            final: true,
        }
    },
    required: ['id', 'product_line_id', 'owner_uid'],
}
