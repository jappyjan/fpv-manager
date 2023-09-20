import {RxJsonSchema} from "rxdb";

export interface Manufacturer {
    id: string;
    name: string;
    website: string | undefined;
}

export const ManufacturerSchema: RxJsonSchema<Manufacturer> = {
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 36
        },
        name: {
            type: 'string',
        },
        website: {
            type: ['string']
        }
    },
    required: ['id', 'name'],
}