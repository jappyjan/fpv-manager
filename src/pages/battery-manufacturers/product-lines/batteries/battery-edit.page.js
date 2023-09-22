import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, List, ListInput, Navbar, Page } from 'framework7-react';
import { useRxData, useRxDB } from "rxdb-hooks";
import { RxDBCollectionNames } from "../../../../rxdb";
import { useCallback, useEffect, useMemo, useState } from "react";
import { batteryIdGenerator } from "../../../../rxdb/schemas/batteries/batteries.schema.ts";
export default function BatteryEditPage(props) {
    const { result: [selectedProductLine] } = useRxData(RxDBCollectionNames.BATTERY_PRODUCT_LINES, (collection) => collection
        .findOne()
        .where('id')
        .equals(props.productLineId)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .and({ manufacturer_id: props.manufacturerId }));
    const { result: [selectedBattery] } = useRxData(RxDBCollectionNames.BATTERIES, (collection) => collection
        .findOne()
        .where('id')
        .equals(props.batteryId)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .and({ product_line_id: props.productLineId }));
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
    const [boughtAt, setBoughtAt] = useState(new Date());
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
            const battery = {
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
        }
        finally {
            setIsSaving(false);
        }
    }, [boughtAt, db, props.batteryId, props.f7router, props.manufacturerId, props.productLineId]);
    const boughtAtAsString = useMemo(() => {
        const year = boughtAt.getFullYear();
        const month = boughtAt.getMonth() + 1;
        const day = boughtAt.getDate();
        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }, [boughtAt]);
    return (_jsxs(Page, { name: "Battery Edit Page", children: [_jsx(Navbar, { title: title, backLink: props.batteryId === '__new__' ? 'Batteries' : selectedProductLine?.name, children: _jsx(Button, { slot: "right", onClick: save, loading: isSaving, children: "Save" }) }), _jsxs(List, { strongIos: true, outlineIos: true, dividersIos: true, form: true, formStoreData: true, id: "battery-edit-form", children: [props.batteryId !== '__new__' && (_jsx(ListInput, { label: "ID", name: "id", type: "text", readonly: true })), _jsx(ListInput, { label: "Bought at", type: "date", placeholder: "Please choose...", value: boughtAtAsString, onInput: (e) => {
                            const value = e.target.value;
                            const [year, month, day] = value.split('-');
                            const date = new Date();
                            date.setFullYear(parseInt(year, 10));
                            date.setMonth(parseInt(month, 10) - 1);
                            date.setDate(parseInt(day, 10));
                            date.setHours(0, 0, 0, 0);
                            setBoughtAt(date);
                        } })] })] }));
}
