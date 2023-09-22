import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Page, Navbar, NavTitleLarge, List, ListGroup, ListItem, SwipeoutActions, SwipeoutButton, Fab, Icon, ListIndex, } from 'framework7-react';
import { RxDBCollectionNames } from "../rxdb";
import { useCallback, useState } from "react";
import useAllItemsFromCollectionWithInfinitePagination from "../rxdb/custom-hooks/use-all-items-froms-collection-with-infinite-pagination.hook.ts";
import useGroupedByFirstLetter from "../hooks/use-grouped-by-first-letter.hook.ts";
import useDeleteBatteryManufacturer from "../hooks/use-delete-battery-manufacturer.hook.ts";
export default function BatteryManufacturersListPage(props) {
    const { items: manufacturers, isFetching: isFetchingManufacturers, resetList: resetManufacturers, isExhausted: isExhaustedManufacturers, fetchMore: fetchMoreManufacturers, } = useAllItemsFromCollectionWithInfinitePagination(RxDBCollectionNames.BATTERY_MANUFACTURERS);
    const refreshList = useCallback(async (doneCallback) => {
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
    const onSwipeoutDelete = useCallback(async (manufacturerId) => {
        setCacheBuster(cacheBuster + 1);
        try {
            await deleteManufacturerById(manufacturerId);
        }
        catch (e) {
            setCacheBuster(cacheBuster + 2);
            throw e;
        }
    }, [cacheBuster, deleteManufacturerById, setCacheBuster]);
    return (_jsxs(Page, { name: "Battery Manufacturers", infinite: !isExhaustedManufacturers, onInfinite: fetchMoreManufacturers, ptr: true, ptrMousewheel: true, onPtrRefresh: refreshList, children: [_jsx(Navbar, { large: true, sliding: false, children: _jsx(NavTitleLarge, { children: "Manufacturers" }) }), _jsx(Fab, { position: "right-bottom", slot: "fixed", onClick: () => props.f7router.navigate('/battery_manufacturers/__new__/edit'), children: _jsx(Icon, { ios: "f7:plus", md: "material:add" }) }), _jsx(ListIndex, { indexes: "auto", listEl: ".list.battery-manufacturers", scrollList: true, label: true }), _jsxs(List, { dividersIos: true, outlineIos: true, strongIos: true, className: 'list battery-manufacturers' + (isFetchingManufacturers ? "skeleton-text" : ''), children: [!isFetchingManufacturers && manufacturers.length === 0 && (_jsx(ListItem, { title: "Add your first Manufacturer...", link: "/battery_manufacturers/__new__/edit" })), isFetchingManufacturers && new Array(5).fill(0).map((_, index) => (_jsx(ListItem, { title: "Lorem Ipsum", link: "#" }, index))), manufacturersGroupedByFirstLetter.map(({ letter, items }) => (_jsxs(ListGroup, { children: [_jsx(ListItem, { title: letter, groupTitle: true }), items?.map((manufacturer) => (_jsx(ListItem, { title: manufacturer.name, link: `/battery_manufacturers/${manufacturer.id}`, swipeout: true, onSwipeoutDelete: () => onSwipeoutDelete(manufacturer.id), children: _jsx(SwipeoutActions, { right: true, children: _jsx(SwipeoutButton, { delete: true, overswipe: true, children: "Delete" }) }) }, manufacturer.id + '#' + cacheBuster)))] }, letter)))] })] }));
}
