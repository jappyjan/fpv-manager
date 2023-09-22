import ShortUniqueId from "short-unique-id";
export const batteryProductLineIdGenerator = new ShortUniqueId({
    length: 5,
    dictionary: 'hex'
});
export const BatteryProductLineSchema = {
    version: 0,
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
        }
    },
    required: ['id', 'name'],
};
