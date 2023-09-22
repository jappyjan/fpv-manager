import {
    Fab,
    Icon,
    Link,
    List, ListButton,
    ListItem,
    Navbar,
    NavTitle,
    Page,
    Popover,
} from 'framework7-react';
import {useRxData} from "rxdb-hooks";
import {RxDBCollectionNames} from "../../../rxdb";
import {useCallback, useMemo} from "react";
import useAllItemsFromCollectionWithInfinitePagination
    from "../../../rxdb/custom-hooks/use-all-items-froms-collection-with-infinite-pagination.hook.ts";
import {BatteryProductLine} from "../../../rxdb/schemas/batteries/battery_product_lines.schema.ts";
import {Battery} from "../../../rxdb/schemas/batteries/batteries.schema.ts";
import {BatteryManufacturer} from "../../../rxdb/schemas/batteries/battery_manufacturers.schema.ts";

interface Props {
    manufacturerId: string;
    productLineId: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    f7router: any;
}

export default function BatteriesListPage(props: Props) {
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

    const {
        items: batteries,
        fetchMore: fetchMoreBatteries,
        isFetching: isFetchingBatteries,
        isExhausted: isExhaustedBatteries,
        resetList: resetBatteries,
    } = useAllItemsFromCollectionWithInfinitePagination<Battery>(RxDBCollectionNames.BATTERIES);

    const onPullToRefresh = useCallback(async (doneCallback: () => void) => {
        resetBatteries();
        doneCallback();
    }, [resetBatteries]);

    const title = useMemo(() => {
        if (!selectedProductLine) {
            return 'not found...';
        }

        if (selectedProductLine.name.length <= 15) {
            return selectedProductLine.name;
        }

        return selectedProductLine.name.substring(0, 15) + '...';
    }, [selectedProductLine]);

    return (
        <Page name="battery-list"
              infinite={!isExhaustedBatteries}
              onInfinite={fetchMoreBatteries}
              ptr
              ptrMousewheel={true}
              onPtrRefresh={onPullToRefresh}
        >
            <Navbar backLink={selectedManufacturer ? selectedManufacturer.name : 'Back'}>
                <NavTitle>
                    {title}
                    <Link popoverOpen=".title-click-popover-menu"
                          style={{display: 'inline'}}
                    >
                        <Icon style={{marginLeft: '.25rem'}}
                              ios="f7:chevron_down"
                              material="md:home"
                              size="small"/>
                    </Link>
                </NavTitle>
            </Navbar>

            <Fab position="right-bottom"
                 slot="fixed"
                 onClick={() => props.f7router.navigate(`/battery_manufacturers/${props.manufacturerId}/product_lines/${props.productLineId}/batteries/__new__/edit`)}
            >
                <Icon ios="f7:plus" md="material:add"/>
            </Fab>

            <Popover className="title-click-popover-menu">
                <List>
                    <ListButton
                        link={`/battery_manufacturers/${props.manufacturerId}/product_lines/${props.productLineId}/edit`}
                        popoverClose
                        title="Edit Details"
                    />
                </List>
            </Popover>


            <List dividersIos outlineIos strongIos className={isFetchingBatteries ? "skeleton-text" : ''}>
                {/* list item button to create first item when there are no product lines */}
                {!isFetchingBatteries && batteries.length === 0 && (
                    <ListItem title="Add your first battery..."
                              link={`/battery_manufacturers/${props.manufacturerId}/product_lines/${props.productLineId}/batteries/__new__/edit`}/>
                )}

                {/* 5 skeleton items */}
                {isFetchingBatteries && new Array(5).fill(0).map((_, index) => (
                    <ListItem title="Lorem Ipsum" link="#" key={index}/>
                ))}

                {/* list items for each product line */}
                {batteries.map((battery) => (
                    <ListItem key={battery.id}
                              title={battery.id}
                              link={`/battery_manufacturers/${props.manufacturerId}/product_lines/${battery.product_line_id}/batteries/${battery.id}`}
                    />
                ))}
            </List>
        </Page>
    );
}
