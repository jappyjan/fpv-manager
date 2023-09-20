import {RxJsonSchema} from "rxdb";
import {Manufacturer} from "../manufacturers/manufacturer.schema.ts";

export interface BatteryProductLine {
    manufacturer_id: Manufacturer['id'];
    id: string;
    name: string;
}

export const BatteryProductLineSchema: RxJsonSchema<BatteryProductLine> = {
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        manufacturer_id: {
            type: 'string',
        },
        id: {
            type: 'string',
            maxLength: 36
        },
        name: {
            type: 'string',
        }
    },
    required: ['id', 'name'],
}