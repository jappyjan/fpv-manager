import {List, ListGroup, ListItem, Navbar, Page,} from 'framework7-react';
import {useRxCollection, useRxQuery} from "rxdb-hooks";
import {RxDBCollectionNames} from "../../rxdb";
import {useCallback, useEffect, useMemo} from "react";
import {Manufacturer} from "../../rxdb/schemas/manufacturers/manufacturer.schema.ts";
import useAllItemsFromCollectionWithInfinitePagination
    from "../../rxdb/custom-hooks/use-all-items-froms-collection-with-infinite-pagination.hook.ts";
import useGroupedByFirstLetter from "../../hooks/use-grouped-by-first-letter.hook.ts";
import {BatteryProductLine} from "../../rxdb/schemas/batteries/battery_product_lines.schema.ts";

interface Props {
    manufacturerId: string;
}

export default function BatteriesListPage(props: Props) {
    const manufacturersCollection = useRxCollection<Manufacturer>(RxDBCollectionNames.MANUFACTURERS);
    const selectedManufacturerQuery = manufacturersCollection?.find().where('id').equals(props.manufacturerId);

    const {
        result: selectedManufacturers
    } = useRxQuery(selectedManufacturerQuery, {
        pageSize: 1,
    });

    const selectedManufacturer = useMemo(() => selectedManufacturers?.[0], [selectedManufacturers]);

    const {
        items: batteryProductLines,
        fetchMore: fetchMoreBatteryProductLines,
        isFetching: isFetchingBatteryProductLines,
        isExhausted: isExhaustedBatteryProductLines,
        resetList: resetBatteryProductLines,
    } = useAllItemsFromCollectionWithInfinitePagination<BatteryProductLine>(RxDBCollectionNames.BATTERY_PRODUCT_LINES);

    const onPullToRefresh = useCallback(async (doneCallback: () => void) => {
        resetBatteryProductLines();
        doneCallback();
    }, [resetBatteryProductLines]);

    const batteryProductLinesGroupedByFirstLetter = useGroupedByFirstLetter({
        items: batteryProductLines,
        key: 'name',
    });

    return (
        <Page name="battery-manufacturer"
              infinite={!isExhaustedBatteryProductLines}
              onInfinite={fetchMoreBatteryProductLines}
              ptr
              ptrMousewheel={true}
              onPtrRefresh={onPullToRefresh}
        >
            <Navbar title={selectedManufacturer?.name ?? 'not found...'} backLink="Manufacturers"/>

            <List dividersIos outlineIos strongIos className={!isFetchingBatteryProductLines ? "skeleton-text" : ''}>
                {/* 5 skeleton items */}
                {!isFetchingBatteryProductLines && new Array(5).fill(0).map((_, index) => (
                    <ListItem title="Lorem Ipsum" link="#" key={index}/>
                ))}
                {batteryProductLinesGroupedByFirstLetter.map(({letter, items}) => (
                    <ListGroup key={letter}>
                        <ListItem title={letter} groupTitle/>
                        {items.map((productLine) => (
                            <ListItem key={productLine.id}
                                      title={productLine.name}
                                      link={`/battery-manufacturers/${props.manufacturerId}/product-lines/${productLine.id}`}
                            />
                        ))}
                    </ListGroup>
                ))}
            </List>
        </Page>
    );
}
