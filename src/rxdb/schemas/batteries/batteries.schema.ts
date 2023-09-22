import {RxJsonSchema} from "rxdb";
import {BatteryProductLine} from "./battery_product_lines.schema.ts";
import ShortUniqueId from "short-unique-id";

export interface Battery {
    product_line_id: BatteryProductLine['id'];
    id: string;
    bought_at: string;
}

export const batteryIdGenerator = new ShortUniqueId({
    length: 5,
    dictionary: 'hex'
});

export const BatterySchema: RxJsonSchema<Battery> = {
    version: 1,
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
        },
    },
    required: ['id', 'product_line_id'],
}