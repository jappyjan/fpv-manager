import {Button, List, ListInput, Navbar, Page} from 'framework7-react';
import {useRxData, useRxDB} from "rxdb-hooks";
import {RxDBCollectionNames} from "../../../rxdb";
import {useCallback, useEffect, useMemo, useState} from "react";
import {
    BatteryProductLine,
    batteryProductLineIdGenerator
} from "../../../rxdb/schemas/batteries/battery_product_lines.schema.ts";
import {BatteryManufacturer} from "../../../rxdb/schemas/batteries/battery_manufacturers.schema.ts";

interface Props {
    manufacturerId: string;
    productLineId: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    f7router: any;
}

export default function ProductLineEditPage(props: Props) {
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
        result: [selectedManufacturer]
    } = useRxData<BatteryManufacturer>(
        RxDBCollectionNames.BATTERY_MANUFACTURERS,
        (collection) => collection
            .findOne()
            .where('id')
            .equals(props.manufacturerId)
    );

    const title = useMemo(() => {
        if (props.productLineId === '__new__') {
            return 'New';
        }

        if (!selectedProductLine) {
            return 'not found...';
        }

        if (selectedProductLine.name.length <= 15) {
            return `edit "${selectedProductLine.name}"`;
        }

        return `edit "${selectedProductLine.name.substring(0, 15)}..."`;
    }, [props.productLineId, selectedProductLine]);

    const db = useRxDB();

    const [name, setName] = useState('');

    useEffect(() => {
        if (!selectedProductLine) {
            return;
        }

        setName(selectedProductLine.name);
    }, [selectedProductLine]);

    const [isSaving, setIsSaving] = useState(false);

    const save = useCallback(async () => {
        setIsSaving(true);
        try {
            const productLine: BatteryProductLine = {
                id: props.productLineId === '__new__' ? batteryProductLineIdGenerator.rnd() : props.productLineId,
                manufacturer_id: props.manufacturerId,
                name,
            };

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            await db[RxDBCollectionNames.BATTERY_PRODUCT_LINES].upsert(productLine);
            props.f7router.navigate(`/battery_manufacturers/${productLine.manufacturer_id}/product_lines/${productLine.id}`, {
                reloadCurrent: true,
            });
        } finally {
            setIsSaving(false);
        }
    }, [db, name, props.f7router, props.manufacturerId, props.productLineId]);

    return (
        <Page name="Battery Manufacturer Edit Page">
            <Navbar title={title} backLink={props.productLineId === '__new__' ? 'Manufacturers' : selectedManufacturer?.name}>
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
                  id="battery-product-line-edit-form"
            >
                <ListInput label="Name"
                           name="name"
                           type="text"
                           clearButton
                           placeholder="e.g. LiHV 4S 15.2V 1300mAh 120C XT60"
                           required
                           onInput={(e) => setName(e.target.value)}
                           value={name}
                />
            </List>
        </Page>
    );
}
