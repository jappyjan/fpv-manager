import {Button, List, ListInput, Navbar, Page} from 'framework7-react';
import {useRxData, useRxDB} from "rxdb-hooks";
import {RxDBCollectionNames} from "../../../../rxdb";
import {useCallback, useEffect, useMemo, useState} from "react";
import {
    BatteryProductLine,
} from "../../../../rxdb/schemas/batteries/battery_product_lines.schema.ts";
import {Battery, batteryIdGenerator} from "../../../../rxdb/schemas/batteries/batteries.schema.ts";

interface Props {
    manufacturerId: string;
    productLineId: string;
    batteryId: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    f7router: any;
}

export default function BatteryEditPage(props: Props) {
    const {
        result: [selectedProductLine]
    } = useRxData<BatteryProductLine>(
        RxDBCollectionNames.BATTERY_PRODUCT_LINES,
        (collection) => collection
            .findOne()
            .where('id')
            .equals(props.productLineId)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .and({manufacturer_id: props.manufacturerId})
    );

    const {
        result: [selectedBattery]
    } = useRxData<Battery>(
        RxDBCollectionNames.BATTERIES,
        (collection) => collection
            .findOne()
            .where('id')
            .equals(props.batteryId)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .and({product_line_id: props.productLineId})
    );

    const title = useMemo(() => {
        if (props.batteryId === '__new__') {
            return 'New';
        }

        if (!selectedBattery) {
            return 'not found...';
        }

        return `edit "${selectedBattery.id}"`;
    }, [props.batteryId, selectedBattery]);

    const db = useRxDB();

    const [boughtAt, setBoughtAt] = useState<Date>(new Date());

    useEffect(() => {
        if (!selectedBattery?.bought_at) {
            return;
        }

        setBoughtAt(new Date(selectedBattery.bought_at));
    }, [selectedBattery, selectedProductLine]);

    const [isSaving, setIsSaving] = useState(false);

    const save = useCallback(async () => {
        setIsSaving(true);
        try {
            const battery: Battery = {
                id: props.batteryId === '__new__' ? batteryIdGenerator.rnd() : props.batteryId,
                product_line_id: props.productLineId,
                bought_at: boughtAt.toISOString(),
            };

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            await db[RxDBCollectionNames.BATTERIES].upsert(battery);
            props.f7router.navigate(`/battery_manufacturers/${props.manufacturerId}/product_lines/${battery.product_line_id}/batteries/${battery.id}`, {
                reloadCurrent: true,
            });
        } finally {
            setIsSaving(false);
        }
    }, [boughtAt, db, props.batteryId, props.f7router, props.manufacturerId, props.productLineId]);

    const boughtAtAsString = useMemo(() => {
        const year = boughtAt.getFullYear();
        const month = boughtAt.getMonth() + 1;
        const day = boughtAt.getDate();

        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }, [boughtAt]);

    return (
        <Page name="Battery Edit Page">
            <Navbar title={title} backLink={props.batteryId === '__new__' ? 'Batteries' : selectedProductLine?.name}>
                <Button slot="right"
                        onClick={save}
                        loading={isSaving}
                >
                    Save
                </Button>
            </Navbar>

            <List strongIos
                  outlineIos
                  dividersIos
                  form
                  formStoreData
                  id="battery-edit-form"
            >
                {props.batteryId !== '__new__' && (
                    <ListInput label="ID"
                               name="id"
                               type="text"
                               readonly
                    />
                )}
                <ListInput
                    label="Bought at"
                    type="date"
                    placeholder="Please choose..."
                    value={boughtAtAsString}
                    onInput={(e) => {
                        const value = e.target.value;
                        const [year, month, day] = value.split('-');
                        const date = new Date();
                        date.setFullYear(parseInt(year, 10));
                        date.setMonth(parseInt(month, 10) - 1);
                        date.setDate(parseInt(day, 10));
                        date.setHours(0, 0, 0, 0);
                        setBoughtAt(date);
                    }}
                />
            </List>
        </Page>
    );
}
