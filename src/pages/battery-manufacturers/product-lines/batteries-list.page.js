import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fab, Icon, Link, List, ListButton, ListItem, Navbar, NavTitle, Page, Popover, } from 'framework7-react';
import { useRxData } from "rxdb-hooks";
import { RxDBCollectionNames } from "../../../rxdb";
import { useCallback, useMemo } from "react";
import useAllItemsFromCollectionWithInfinitePagination from "../../../rxdb/custom-hooks/use-all-items-froms-collection-with-infinite-pagination.hook.ts";
export default function BatteriesListPage(props) {
    const { result: [selectedProductLine] } = useRxData(RxDBCollectionNames.BATTERY_PRODUCT_LINES, (collection) => collection
        .findOne()
        .where('id')
        .equals(props.productLineId)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .and({ manufacturer_id: props.manufacturerId }));
    const { result: [selectedManufacturer] } = useRxData(RxDBCollectionNames.BATTERY_MANUFACTURERS, (collection) => collection
        .findOne()
        .where('id')
        .equals(props.manufacturerId));
    const { items: batteries, fetchMore: fetchMoreBatteries, isFetching: isFetchingBatteries, isExhausted: isExhaustedBatteries, resetList: resetBatteries, } = useAllItemsFromCollectionWithInfinitePagination(RxDBCollectionNames.BATTERIES);
    const onPullToRefresh = useCallback(async (doneCallback) => {
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
    return (_jsxs(Page, { name: "battery-list", infinite: !isExhaustedBatteries, onInfinite: fetchMoreBatteries, ptr: true, ptrMousewheel: true, onPtrRefresh: onPullToRefresh, children: [_jsx(Navbar, { backLink: selectedManufacturer ? selectedManufacturer.name : 'Back', children: _jsxs(NavTitle, { children: [title, _jsx(Link, { popoverOpen: ".title-click-popover-menu", style: { display: 'inline' }, children: _jsx(Icon, { style: { marginLeft: '.25rem' }, ios: "f7:chevron_down", md: "material:chevron_down", size: "small" }) })] }) }), _jsx(Fab, { position: "right-bottom", slot: "fixed", onClick: () => props.f7router.navigate(`/battery_manufacturers/${props.manufacturerId}/product_lines/${props.productLineId}/batteries/__new__/edit`), children: _jsx(Icon, { ios: "f7:plus", md: "material:add" }) }), _jsx(Popover, { className: "title-click-popover-menu", children: _jsx(List, { children: _jsx(ListButton, { link: `/battery_manufacturers/${props.manufacturerId}/product_lines/${props.productLineId}/edit`, popoverClose: true, title: "Edit Details" }) }) }), _jsxs(List, { dividersIos: true, outlineIos: true, strongIos: true, className: isFetchingBatteries ? "skeleton-text" : '', children: [!isFetchingBatteries && batteries.length === 0 && (_jsx(ListItem, { title: "Add your first battery...", link: `/battery_manufacturers/${props.manufacturerId}/product_lines/${props.productLineId}/batteries/__new__/edit` })), isFetchingBatteries && new Array(5).fill(0).map((_, index) => (_jsx(ListItem, { title: "Lorem Ipsum", link: "#" }, index))), batteries.map((battery) => (_jsx(ListItem, { title: battery.id, link: `/battery_manufacturers/${props.manufacturerId}/product_lines/${battery.product_line_id}/batteries/${battery.id}` }, battery.id)))] })] }));
}
