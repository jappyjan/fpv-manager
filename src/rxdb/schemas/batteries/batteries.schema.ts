import {RxJsonSchema} from "rxdb";
import {BatteryProductLine} from "./battery_product_lines.schema.ts";

export interface Battery {
    product_line_id: BatteryProductLine['id'];
    id: string;
}

export const BatterySchema: RxJsonSchema<Battery> = {
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        product_line_id: {
            type: 'string',
        },
        id: {
            type: 'string',
            maxLength: 36
        }
    },
    required: ['id', 'product_line_id'],
}