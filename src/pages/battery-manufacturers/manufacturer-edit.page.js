import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, List, ListInput, Navbar, Page } from 'framework7-react';
import { useRxCollection, useRxDB, useRxQuery } from "rxdb-hooks";
import { RxDBCollectionNames } from "../../rxdb";
import { useCallback, useEffect, useMemo, useState } from "react";
import { batteryManufacturerIdGenerator } from "../../rxdb/schemas/batteries/battery_manufacturers.schema.ts";
export default function ManufacturerEditPage(props) {
    const manufacturersCollection = useRxCollection(RxDBCollectionNames.BATTERY_MANUFACTURERS);
    const selectedManufacturerQuery = useMemo(() => {
        return manufacturersCollection
            ?.find()
            .where('id')
            .equals(props.manufacturerId);
    }, [manufacturersCollection, props.manufacturerId]);
    const { result: selectedManufacturers } = useRxQuery(selectedManufacturerQuery, {
        pageSize: 1,
    });
    const selectedManufacturer = useMemo(() => selectedManufacturers?.[0], [selectedManufacturers]);
    const title = useMemo(() => {
        if (props.manufacturerId === '__new__') {
            return 'New';
        }
        if (!selectedManufacturer) {
            return 'not found...';
        }
        return `edit "${selectedManufacturer.name}"`;
    }, [selectedManufacturer, props.manufacturerId]);
    const db = useRxDB();
    const [name, setName] = useState('');
    const [website, setWebsite] = useState('');
    useEffect(() => {
        if (!selectedManufacturer) {
            return;
        }
        setName(selectedManufacturer.name);
        setWebsite(selectedManufacturer.website ?? '');
    }, [selectedManufacturer]);
    const [isSaving, setIsSaving] = useState(false);
    const save = useCallback(async () => {
        setIsSaving(true);
        try {
            const manufacturer = {
                id: props.manufacturerId === '__new__' ? batteryManufacturerIdGenerator.rnd() : props.manufacturerId,
                name,
                website
            };
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            await db[RxDBCollectionNames.BATTERY_MANUFACTURERS].upsert(manufacturer);
            props.f7router.navigate(`/battery_manufacturers/${manufacturer.id}`, {
                reloadCurrent: true,
            });
        }
        finally {
            setIsSaving(false);
        }
    }, [db, name, website, props.f7router]);
    return (_jsxs(Page, { name: "Battery Manufacturer Edit Page", children: [_jsx(Navbar, { title: title, backLink: "Manufacturers", children: _jsx(Button, { slot: "right", onClick: save, loading: isSaving, children: "Save" }) }), _jsxs(List, { strongIos: true, outlineIos: true, dividersIos: true, form: true, formStoreData: true, id: "battery-manufacturer-edit-form", children: [_jsx(ListInput, { label: "Name", name: "name", type: "text", clearButton: true, placeholder: "Name / Label", required: true, onInput: (e) => setName(e.target.value), value: name }), _jsx(ListInput, { label: "Website", name: "website", type: "url", placeholder: "Website", clearButton: true, onInput: (e) => setWebsite(e.target.value), value: website })] })] }));
}
