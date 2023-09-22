import { useMemo } from "react";
export default function useGroupedByFirstLetter(props) {
    const grouped = useMemo(() => {
        if (!props.items) {
            return [];
        }
        const grouped = props.items.reduce((acc, items) => {
            const firstLetter = String(items[props.key] ?? '').charAt(0).toUpperCase();
            if (!acc[firstLetter]) {
                acc[firstLetter] = [];
            }
            acc[firstLetter].push(items);
            return acc;
        }, {});
        return Object.entries(grouped).map(([letter, items]) => ({
            letter,
            items,
        }));
    }, [props]);
    return grouped.sort((a, b) => a.letter.localeCompare(b.letter));
}
