import {
    Page,
    Navbar,
    NavTitleLarge,
    List,
    ListGroup,
    ListItem,
    SwipeoutActions,
    SwipeoutButton,
    Fab,
    Icon, ListIndex,
} from 'framework7-react';
import {RxDBCollectionNames} from "../rxdb";
import {useCallback, useState} from "react";
import useAllItemsFromCollectionWithInfinitePagination
    from "../rxdb/custom-hooks/use-all-items-froms-collection-with-infinite-pagination.hook.ts";
import useGroupedByFirstLetter from "../hooks/use-grouped-by-first-letter.hook.ts";
import useDeleteBatteryManufacturer from "../hooks/use-delete-battery-manufacturer.hook.ts";
import {BatteryManufacturer} from "../rxdb/schemas/batteries/battery_manufacturers.schema.ts";

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    f7router: any;
}

export default function BatteryManufacturersListPage(props: Props) {
    const {
        items: manufacturers,
        isFetching: isFetchingManufacturers,
        resetList: resetManufacturers,
        isExhausted: isExhaustedManufacturers,
        fetchMore: fetchMoreManufacturers,
    } = useAllItemsFromCollectionWithInfinitePagination<BatteryManufacturer>(RxDBCollectionNames.BATTERY_MANUFACTURERS);

    const refreshList = useCallback(async (doneCallback?: () => void) => {
        resetManufacturers();
        fetchMoreManufacturers();
        if (typeof doneCallback === 'function') {
            doneCallback();
        }
    }, [fetchMoreManufacturers, resetManufacturers]);

    const manufacturersGroupedByFirstLetter = useGroupedByFirstLetter({
        items: manufacturers,
        key: 'name',
    });


    const [cacheBuster, setCacheBuster] = useState(0);
    const deleteManufacturerById = useDeleteBatteryManufacturer();

    const onSwipeoutDelete = useCallback(async (manufacturerId: string) => {
        setCacheBuster(cacheBuster + 1);
        try {
            await deleteManufacturerById(manufacturerId);
        } catch (e) {
            setCacheBuster(cacheBuster + 2);
            throw e;
        }
    }, [cacheBuster, deleteManufacturerById, setCacheBuster]);

    return (
        <Page name="Battery Manufacturers"
              infinite={!isExhaustedManufacturers}
              onInfinite={fetchMoreManufacturers}
              ptr
              ptrMousewheel={true}
              onPtrRefresh={refreshList}
        >
            <Navbar large sliding={false}>
                <NavTitleLarge>Manufacturers</NavTitleLarge>
            </Navbar>

            <Fab position="right-bottom"
                 slot="fixed"
                 onClick={() => props.f7router.navigate('/battery_manufacturers/__new__/edit')}
            >
                <Icon ios="f7:plus" md="material:add"/>
            </Fab>

            <ListIndex
                indexes="auto"
                listEl=".list.battery-manufacturers"
                scrollList={true}
                label={true}
            />

            <List dividersIos
                  outlineIos
                  strongIos
                  className={'list battery-manufacturers' + (isFetchingManufacturers ? "skeleton-text" : '')}
            >
                {!isFetchingManufacturers && manufacturers.length === 0 && (
                    <ListItem title="Add your first Manufacturer..." link="/battery_manufacturers/__new__/edit"/>
                )}
                {/* 5 skeleton items */}
                {isFetchingManufacturers && new Array(5).fill(0).map((_, index) => (
                    <ListItem title="Lorem Ipsum" link="#" key={index}/>
                ))}
                {manufacturersGroupedByFirstLetter.map(({letter, items}) => (
                    <ListGroup key={letter}>
                        <ListItem title={letter} groupTitle/>
                        {items?.map((manufacturer) => (
                            <ListItem key={manufacturer.id + '#' + cacheBuster}
                                      title={manufacturer.name}
                                      link={`/battery_manufacturers/${manufacturer.id}`}
                                      swipeout
                                      onSwipeoutDelete={() => onSwipeoutDelete(manufacturer.id)}
                            >
                                <SwipeoutActions right>
                                    <SwipeoutButton
                                        delete
                                        overswipe
                                    >
                                        Delete
                                    </SwipeoutButton>
                                </SwipeoutActions>
                            </ListItem>
                        ))}
                    </ListGroup>
                ))}
            </List>
        </Page>
    );
}
