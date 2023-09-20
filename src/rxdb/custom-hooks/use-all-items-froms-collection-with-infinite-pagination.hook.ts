import {useRxCollection, useRxQuery} from "rxdb-hooks";
import {Manufacturer} from "../schemas/manufacturers/manufacturer.schema.ts";
import {RxDBCollectionNames} from "../index.ts";
import {RxDocument} from "rxdb";

interface ReturnType<T> {
    items: RxDocument<T>[];
    isFetching: boolean;
    fetchMore: () => void;
    isExhausted: boolean;
    resetList: () => void;
}

export default function useAllItemsFromCollectionWithInfinitePagination<T>(collectionName: RxDBCollectionNames, pageSize = 25): ReturnType<T> {
    const collection = useRxCollection<T>(collectionName);
    const allItemsQuery = collection?.find();

    const {
        result: items,
        isFetching,
        fetchMore,
        isExhausted,
        resetList,
    } = useRxQuery(allItemsQuery, {
        pageSize,
        pagination: 'Infinite',
    });

    return {
        items,
        isFetching,
        isExhausted,
        resetList,
        fetchMore
    }
}