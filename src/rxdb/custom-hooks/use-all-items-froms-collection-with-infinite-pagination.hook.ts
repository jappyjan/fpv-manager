import {AnyRxQuery, useRxCollection, useRxQuery} from "rxdb-hooks";
import {RxDBCollectionNames} from "../index.ts";
import {RxDocument} from "rxdb";
import {useMemo} from "react";

interface ReturnType<T> {
    items: RxDocument<T>[];
    isFetching: boolean;
    fetchMore: () => void;
    isExhausted: boolean;
    resetList: () => void;
}

export default function useAllItemsFromCollectionWithInfinitePagination<T>(collectionName: RxDBCollectionNames, pageSize = 25): ReturnType<T> {
    const collection = useRxCollection<T>(collectionName);
    const allItemsQuery = useMemo(() => {
        return collection?.find() as AnyRxQuery<RxDocument<T>>;
    }, [collection]);

    const {
        result: items,
        isFetching,
        fetchMore,
        isExhausted,
        resetList,
    } = useRxQuery<RxDocument<T>>(allItemsQuery, {
        pageSize,
        pagination: 'Infinite',
    });

    return {
        items: items,
        isFetching,
        isExhausted,
        resetList,
        fetchMore
    }
}
