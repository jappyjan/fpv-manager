import { useCallback } from "react";
export default function useDownloadCanvasAsImage() {
    return useCallback((canvasToSave, fileName) => {
        const link = document.createElement('a');
        link.download = fileName + '.png';
        link.href = canvasToSave.toDataURL();
        link.click();
    }, []);
}
