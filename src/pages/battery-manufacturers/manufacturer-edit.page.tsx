import {Button, List, ListInput, Navbar, Page} from 'framework7-react';
import {useRxCollection, useRxDB, useRxQuery} from "rxdb-hooks";
import {RxDBCollectionNames} from "../../rxdb";
import {useCallback, useEffect, useMemo, useState} from "react";
import {BatteryManufacturer, batteryManufacturerIdGenerator} from "../../rxdb/schemas/batteries/battery_manufacturers.schema.ts";

interface Props {
    manufacturerId: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    f7router: any;
}

export default function ManufacturerEditPage(props: Props) {
    const manufacturersCollection = useRxCollection<BatteryManufacturer>(RxDBCollectionNames.BATTERY_MANUFACTURERS);
    const selectedManufacturerQuery = useMemo(() => {
        return manufacturersCollection
            ?.find()
            .where('id')
            .equals(props.manufacturerId);
    }, [manufacturersCollection, props.manufacturerId]);

    const {
        result: selectedManufacturers
    } = useRxQuery(selectedManufacturerQuery!, {
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
            const manufacturer: BatteryManufacturer = {
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
        } finally {
            setIsSaving(false);
        }
    }, [db, name, website, props.f7router]);

    return (
        <Page name="Battery Manufacturer Edit Page">
            <Navbar title={title} backLink="Manufacturers">
                <Button slot="right"
                        onClick={save}
                        loading={isSaving}
                >Save</Button>
            </Navbar>

            <List strongIos
                  outlineIos
                  dividersIos
                  form
                  formStoreData
                  id="battery-manufacturer-edit-form"
            >
                <ListInput label="Name"
                           name="name"
                           type="text"
                           clearButton
                           placeholder="Name / Label"
                           required
                           onInput={(e) => setName(e.target.value)}
                           value={name}
                />
                <ListInput label="Website"
                           name="website"
                           type="url"
                           placeholder="Website"
                           clearButton
                           onInput={(e) => setWebsite(e.target.value)}
                           value={website}
                />
            </List>
        </Page>
    );
}
