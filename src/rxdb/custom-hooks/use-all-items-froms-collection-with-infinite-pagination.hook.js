import { useRxCollection, useRxQuery } from "rxdb-hooks";
import { useMemo } from "react";
export default function useAllItemsFromCollectionWithInfinitePagination(collectionName, pageSize = 25) {
    const collection = useRxCollection(collectionName);
    const allItemsQuery = useMemo(() => {
        return collection?.find();
    }, [collection]);
    const { result: items, isFetching, fetchMore, isExhausted, resetList, } = useRxQuery(allItemsQuery, {
        pageSize,
        pagination: 'Infinite',
    });
    return {
        items,
        isFetching,
        isExhausted,
        resetList,
        fetchMore
    };
}
