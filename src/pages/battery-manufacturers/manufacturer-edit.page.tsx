import {Navbar, Page} from 'framework7-react';
import {useRxCollection, useRxQuery} from "rxdb-hooks";
import {RxDBCollectionNames} from "../../rxdb";
import {useMemo} from "react";
import {Manufacturer} from "../../rxdb/schemas/manufacturers/manufacturer.schema.ts";

interface Props {
    manufacturerId: string;
}

export default function ManufacturerEditPage(props: Props) {
    const manufacturersCollection = useRxCollection<Manufacturer>(RxDBCollectionNames.MANUFACTURERS);
    const selectedManufacturerQuery = manufacturersCollection?.find().where('id').equals(props.manufacturerId);

    const {
        result: selectedManufacturers
    } = useRxQuery(selectedManufacturerQuery, {
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

        return `edit ${selectedManufacturer.name}`;
    }, [selectedManufacturer, props.manufacturerId]);

    return (
        <Page name="Battery Manufacturer Edit Page">
            <Navbar title={title} backLink="Manufacturers"/>

            Hello world. I am an edit page
        </Page>
    );
}
