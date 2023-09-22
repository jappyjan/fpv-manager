import {useCallback} from "react";
import Printd from "printd";

export default function usePrintElementHook() {
    return useCallback((elementToPrint: HTMLElement) => {
        const d = new Printd()
        d.print(elementToPrint);
    }, []);
}