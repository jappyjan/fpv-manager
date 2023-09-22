import {useCallback} from "react";

export default function useDownloadCanvasAsImage() {
    return useCallback((canvasToSave: HTMLCanvasElement, fileName: string) => {
        const link = document.createElement('a') as HTMLAnchorElement;
        link.download = fileName + '.png';
        link.href = canvasToSave.toDataURL();
        link.click();
    }, []);
}