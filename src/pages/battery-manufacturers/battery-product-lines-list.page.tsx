import {
    Fab,
    Icon,
    Link,
    List, ListButton,
    ListItem,
    Navbar,
    NavRight,
    NavTitle,
    Page,
    Popover,
} from 'framework7-react';
import {useRxCollection, useRxQuery} from "rxdb-hooks";
import {RxDBCollectionNames} from "../../rxdb";
import {useCallback, useMemo} from "react";
import useAllItemsFromCollectionWithInfinitePagination
    from "../../rxdb/custom-hooks/use-all-items-froms-collection-with-infinite-pagination.hook.ts";
import {BatteryProductLine} from "../../rxdb/schemas/batteries/battery_product_lines.schema.ts";
import useDeleteBatteryManufacturer from "../../hooks/use-delete-battery-manufacturer.hook.ts";
import {BatteryManufacturer} from "../../rxdb/schemas/batteries/battery_manufacturers.schema.ts";

interface Props {
    manufacturerId: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    f7router: any;
}

export default function BatteryProductLinesListPage(props: Props) {
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

    const batteryProductLinesSorted = useMemo(() => {
        return batteryProductLines.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
    }, [batteryProductLines]);

    const deleteManufacturerById = useDeleteBatteryManufacturer();
    const onClickDeleteManufacturer = useCallback(async () => {
        await deleteManufacturerById(props.manufacturerId);
        props.f7router.navigate('/battery-manufacturers', {
            reloadCurrent: true,
        });
    }, [deleteManufacturerById, props.f7router, props.manufacturerId]);

    return (
        <Page name="battery-manufacturer"
              infinite={!isExhaustedBatteryProductLines}
              onInfinite={fetchMoreBatteryProductLines}
              ptr
              ptrMousewheel={true}
              onPtrRefresh={onPullToRefresh}
        >
            <Navbar backLink="Manufacturers">
                <NavTitle>
                    {selectedManufacturer?.name ?? 'not found...'}
                    <Link popoverOpen=".title-click-popover-menu"
                          style={{display: 'inline'}}
                    >
                        <Icon style={{marginLeft: '.25rem'}} ios="f7:chevron_down" md="material:chevron_down"
                              size="small"/>
                    </Link>
                </NavTitle>
                <NavRight>
                    {selectedManufacturer?.website && (
                        <Link external
                              href={selectedManufacturer.website}
                              target="_blank"
                        >
                            Website
                        </Link>
                    )}
                </NavRight>
            </Navbar>

            <Fab position="right-bottom"
                 slot="fixed"
                 onClick={() => props.f7router.navigate(`/battery_manufacturers/${props.manufacturerId}/product_lines/__new__/edit`)}
            >
                <Icon ios="f7:plus" md="material:add"/>
            </Fab>

            <Popover className="title-click-popover-menu">
                <List>
                    <ListButton link={`/battery_manufacturers/${props.manufacturerId}/edit`}
                                popoverClose
                                title="Edit Details"
                    />
                    <ListButton popoverClose
                                title="Delete"
                                onClick={onClickDeleteManufacturer}
                                color="red"
                                colorTheme="red"
                    />
                </List>
            </Popover>


            <List dividersIos outlineIos strongIos className={isFetchingBatteryProductLines ? "skeleton-text" : ''}>
                {/* list item button to create first item when there are no product lines */}
                {!isFetchingBatteryProductLines && batteryProductLines.length === 0 && (
                    <ListItem title="Add your first product-line..."
                              link={`/battery_manufacturers/${props.manufacturerId}/product_lines/__new__/edit`}/>
                )}

                {/* 5 skeleton items */}
                {isFetchingBatteryProductLines && new Array(5).fill(0).map((_, index) => (
                    <ListItem title="Lorem Ipsum" link="#" key={index}/>
                ))}

                {/* list items for each product line */}
                {batteryProductLinesSorted.map((productLine) => (
                    <ListItem key={productLine.id}
                              title={productLine.name}
                              link={`/battery_manufacturers/${props.manufacturerId}/product_lines/${productLine.id}`}
                    />
                ))}
            </List>
        </Page>
    );
}
