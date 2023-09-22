import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fab, Icon, Link, List, ListButton, ListItem, Navbar, NavRight, NavTitle, Page, Popover, } from 'framework7-react';
import { useRxCollection, useRxQuery } from "rxdb-hooks";
import { RxDBCollectionNames } from "../../rxdb";
import { useCallback, useMemo } from "react";
import useAllItemsFromCollectionWithInfinitePagination from "../../rxdb/custom-hooks/use-all-items-froms-collection-with-infinite-pagination.hook.ts";
import useDeleteBatteryManufacturer from "../../hooks/use-delete-battery-manufacturer.hook.ts";
export default function BatteryProductLinesListPage(props) {
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
    const { items: batteryProductLines, fetchMore: fetchMoreBatteryProductLines, isFetching: isFetchingBatteryProductLines, isExhausted: isExhaustedBatteryProductLines, resetList: resetBatteryProductLines, } = useAllItemsFromCollectionWithInfinitePagination(RxDBCollectionNames.BATTERY_PRODUCT_LINES);
    const onPullToRefresh = useCallback(async (doneCallback) => {
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
    return (_jsxs(Page, { name: "battery-manufacturer", infinite: !isExhaustedBatteryProductLines, onInfinite: fetchMoreBatteryProductLines, ptr: true, ptrMousewheel: true, onPtrRefresh: onPullToRefresh, children: [_jsxs(Navbar, { backLink: "Manufacturers", children: [_jsxs(NavTitle, { children: [selectedManufacturer?.name ?? 'not found...', _jsx(Link, { popoverOpen: ".title-click-popover-menu", style: { display: 'inline' }, children: _jsx(Icon, { style: { marginLeft: '.25rem' }, ios: "f7:chevron_down", md: "material:chevron_down", size: "small" }) })] }), _jsx(NavRight, { children: selectedManufacturer?.website && (_jsx(Link, { external: true, href: selectedManufacturer.website, target: "_blank", children: "Website" })) })] }), _jsx(Fab, { position: "right-bottom", slot: "fixed", onClick: () => props.f7router.navigate(`/battery_manufacturers/${props.manufacturerId}/product_lines/__new__/edit`), children: _jsx(Icon, { ios: "f7:plus", md: "material:add" }) }), _jsx(Popover, { className: "title-click-popover-menu", children: _jsxs(List, { children: [_jsx(ListButton, { link: `/battery_manufacturers/${props.manufacturerId}/edit`, popoverClose: true, title: "Edit Details" }), _jsx(ListButton, { popoverClose: true, title: "Delete", onClick: onClickDeleteManufacturer, color: "red", colorTheme: "red" })] }) }), _jsxs(List, { dividersIos: true, outlineIos: true, strongIos: true, className: isFetchingBatteryProductLines ? "skeleton-text" : '', children: [!isFetchingBatteryProductLines && batteryProductLines.length === 0 && (_jsx(ListItem, { title: "Add your first product-line...", link: `/battery_manufacturers/${props.manufacturerId}/product_lines/__new__/edit` })), isFetchingBatteryProductLines && new Array(5).fill(0).map((_, index) => (_jsx(ListItem, { title: "Lorem Ipsum", link: "#" }, index))), batteryProductLinesSorted.map((productLine) => (_jsx(ListItem, { title: productLine.name, link: `/battery_manufacturers/${props.manufacturerId}/product_lines/${productLine.id}` }, productLine.id)))] })] }));
}
