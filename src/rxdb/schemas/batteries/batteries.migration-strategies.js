export const batteryMigrationStrategies = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    1: (oldDoc) => {
        return {
            id: oldDoc.id,
            product_line_id: oldDoc.product_line_id,
            bought_at: new Date().toISOString(),
        };
    }
};
