import {
    Page,
    Navbar,
    NavTitleLarge,
    List,
    ListGroup,
    ListItem,
} from 'framework7-react';
import {RxDBCollectionNames} from "../rxdb";
import {useCallback} from "react";
import {Manufacturer} from "../rxdb/schemas/manufacturers/manufacturer.schema.ts";
import useAllItemsFromCollectionWithInfinitePagination
    from "../rxdb/custom-hooks/use-all-items-froms-collection-with-infinite-pagination.hook.ts";
import useGroupedByFirstLetter from "../hooks/use-grouped-by-first-letter.hook.ts";

export default function BatteryManufacturersListPage() {
    const {
        items: manufacturers,
        isFetching: isFetchingManufacturers,
        resetList: resetManufacturers,
        isExhausted: isExhaustedManufacturers,
        fetchMore: fetchMoreManufacturers,
    } = useAllItemsFromCollectionWithInfinitePagination<Manufacturer>(RxDBCollectionNames.MANUFACTURERS);

    const onPullToRefresh = useCallback(async (doneCallback: () => void) => {
        resetManufacturers();
        doneCallback();
    }, [resetManufacturers]);

    const manufacturersGroupedByFirstLetter = useGroupedByFirstLetter({
        items: manufacturers,
        key: 'name',
    });

    return (
        <Page name="Battery Manufacturers"
              infinite={!isExhaustedManufacturers}
              onInfinite={fetchMoreManufacturers}
              ptr
              ptrMousewheel={true}
              onPtrRefresh={onPullToRefresh}
        >
            <Navbar large sliding={false}>
                <NavTitleLarge>Manufacturers</NavTitleLarge>
            </Navbar>

            <List dividersIos outlineIos strongIos className={isFetchingManufacturers ? "skeleton-text" : ''}>
                {!isFetchingManufacturers && manufacturers.length === 0 && (
                    <ListItem title="Add your first Manufacturer..." link="/battery-manufacturers/__new__/edit"/>
                )}
                {/* 5 skeleton items */}
                {isFetchingManufacturers && new Array(5).fill(0).map((_, index) => (
                    <ListItem title="Lorem Ipsum" link="#" key={index}/>
                ))}
                {manufacturersGroupedByFirstLetter.map(({letter, manufacturers}) => (
                    <ListGroup key={letter}>
                        <ListItem title={letter} groupTitle/>
                        {manufacturers.map((manufacturer) => (
                            <ListItem key={manufacturer.id}
                                      title={manufacturer.name}
                                      link={`/battery-manufacturers/${manufacturer.id}`}
                            />
                        ))}
                    </ListGroup>
                ))}
            </List>
        </Page>
    );
}
