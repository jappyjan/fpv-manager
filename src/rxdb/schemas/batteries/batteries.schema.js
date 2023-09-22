import ShortUniqueId from "short-unique-id";
export const batteryIdGenerator = new ShortUniqueId({
    length: 5,
    dictionary: 'hex'
});
export const BatterySchema = {
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
};
