import {RxJsonSchema} from "rxdb";
import ShortUniqueId from "short-unique-id";
import {ReplicatedDocument} from "./replicated-document.ts";

export interface BatteryManufacturer {
    id: string;
    name: string;
    website: string | undefined;
}

export const batteryManufacturerIdGenerator = new ShortUniqueId({
    length: 5,
    dictionary: 'hex'
});

export const BatteryManufacturersSchema: RxJsonSchema<BatteryManufacturer & ReplicatedDocument> = {
    version: 1,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 5
        },
        name: {
            type: 'string',
        },
        website: {
            type: ['string']
        },
        owner_uid: {
            type: 'string',
            final: true,
        }
    },
    required: ['id', 'name', 'owner_uid'],
}
