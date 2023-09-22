import {useRxDB} from "rxdb-hooks";
import {useCallback} from "react";
import {RxDocument} from "rxdb";
import {Battery} from "../rxdb/schemas/batteries/batteries.schema.ts";
import {RxDBCollectionNames} from "../rxdb";
import {BatteryProductLine} from "../rxdb/schemas/batteries/battery_product_lines.schema.ts";
import {f7} from "framework7-react";
import {BatteryManufacturer} from "../rxdb/schemas/batteries/battery_manufacturers.schema.ts";

export default function useDeleteBatteryManufacturer() {
    const db = useRxDB();

    const deleteAllBatteriesOfProductLine = useCallback(async (productLineId: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const batteries: RxDocument<Battery>[] = await db[RxDBCollectionNames.BATTERIES]
            .find()
            .where('product_line_id')
            .equals(productLineId)
            .exec();

        await Promise.all(batteries.map((battery) => battery.remove()));
    }, [db]);

    const deleteAllProductLinesOfManufacturer = useCallback(async (manufacturerId: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const productLines: RxDocument<BatteryProductLine>[] = await db[RxDBCollectionNames.BATTERY_PRODUCT_LINES]
            .find()
            .where('manufacturer_id')
            .equals(manufacturerId)
            .exec();

        await Promise.all(productLines.map((productLine) => {
            return deleteAllBatteriesOfProductLine(productLine.id);
        }));

        await Promise.all(productLines.map((productLine) => productLine.remove()));
    }, [db, deleteAllBatteriesOfProductLine]);

    const deleteOneManufacturerWithAllProductLinesAndBatteries = useCallback(async (manufacturerId: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const manufacturerDocument: RxDocument<BatteryManufacturer> = await db[RxDBCollectionNames.BATTERY_MANUFACTURERS].findOne({
            selector: {
                id: manufacturerId,
            }
        }).exec();

        if (!manufacturerDocument) {
            console.warn(`Manufacturer with id ${manufacturerId} not found...`);
            return;
        }

        await deleteAllProductLinesOfManufacturer(manufacturerId);
        await manufacturerDocument.remove();
    }, [db, deleteAllProductLinesOfManufacturer]);

    return useCallback(async (manufacturerId: string) => {
        return new Promise<void>((resolve, reject) => {
            f7.dialog.confirm('Are you sure you want to delete this manufacturer and all batteries related to it??', async () => {
                try {
                    await deleteOneManufacturerWithAllProductLinesAndBatteries(manufacturerId);
                    resolve();
                } catch (e) {
                    reject(e);
                }
            });
        });
    }, [db, deleteAllProductLinesOfManufacturer]);
}
