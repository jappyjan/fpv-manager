import ShortUniqueId from "short-unique-id";
export const batteryManufacturerIdGenerator = new ShortUniqueId({
    length: 5,
    dictionary: 'hex'
});
export const BatteryManufacturersSchema = {
    version: 0,
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
        }
    },
    required: ['id', 'name'],
};
