import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, List, ListInput, Navbar, Page } from 'framework7-react';
import { useRxData, useRxDB } from "rxdb-hooks";
import { RxDBCollectionNames } from "../../../rxdb";
import { useCallback, useEffect, useMemo, useState } from "react";
import { batteryProductLineIdGenerator } from "../../../rxdb/schemas/batteries/battery_product_lines.schema.ts";
export default function ProductLineEditPage(props) {
    const { result: [selectedProductLine] } = useRxData(RxDBCollectionNames.BATTERY_PRODUCT_LINES, (collection) => collection
        .findOne()
        .where('id')
        .equals(props.productLineId)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .and({ manufacturer_id: props.manufacturerId }));
    const { result: [selectedManufacturer] } = useRxData(RxDBCollectionNames.BATTERY_MANUFACTURERS, (collection) => collection
        .findOne()
        .where('id')
        .equals(props.manufacturerId));
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
            const productLine = {
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
        }
        finally {
            setIsSaving(false);
        }
    }, [db, name, props.f7router, props.manufacturerId, props.productLineId]);
    return (_jsxs(Page, { name: "Battery Manufacturer Edit Page", children: [_jsx(Navbar, { title: title, backLink: props.productLineId === '__new__' ? 'Manufacturers' : selectedManufacturer?.name, children: _jsx(Button, { slot: "right", onClick: save, loading: isSaving, children: "Save" }) }), _jsx(List, { strongIos: true, outlineIos: true, dividersIos: true, form: true, formStoreData: true, id: "battery-product-line-edit-form", children: _jsx(ListInput, { label: "Name", name: "name", type: "text", clearButton: true, placeholder: "e.g. LiHV 4S 15.2V 1300mAh 120C XT60", required: true, onInput: (e) => setName(e.target.value), value: name }) })] }));
}
