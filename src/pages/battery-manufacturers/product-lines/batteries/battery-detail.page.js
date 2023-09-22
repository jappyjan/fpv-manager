import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { BlockTitle, List, ListButton, Navbar, Page } from 'framework7-react';
import { useRxData } from "rxdb-hooks";
import { RxDBCollectionNames } from "../../../../rxdb";
import { useCallback, useMemo } from "react";
import usePrintElementHook from "../../../../hooks/use-print-element.hook.ts";
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import ShortUniqueId from "short-unique-id";
import useDownloadCanvasAsImage from "../../../../hooks/use-download-canvas-as-image.hook.ts";
export default function BatteryDetailPage(props) {
    const { result: [selectedProductLine] } = useRxData(RxDBCollectionNames.BATTERY_PRODUCT_LINES, (collection) => collection
        .findOne()
        .where('id')
        .equals(props.productLineId)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .and({ manufacturer_id: props.manufacturerId }));
    const { result: [selectedBattery] } = useRxData(RxDBCollectionNames.BATTERIES, (collection) => collection
        .findOne()
        .where('id')
        .equals(props.batteryId)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .and({ product_line_id: props.productLineId }));
    const title = useMemo(() => {
        if (!selectedBattery) {
            return 'not found...';
        }
        return selectedBattery.id;
    }, [selectedBattery]);
    const backButton = useMemo(() => {
        if (!selectedProductLine) {
            return 'Back';
        }
        if (selectedProductLine.name.length <= 5) {
            return selectedProductLine.name;
        }
        return selectedProductLine.name.substring(0, 5) + '...';
    }, [selectedProductLine]);
    const printElement = usePrintElementHook();
    const downloadCanvasAsImage = useDownloadCanvasAsImage();
    const qrCodeContainerId = useMemo(() => {
        return `qr-code-${new ShortUniqueId().rnd(5)}`;
    }, []);
    const getQrCodeCanvasElement = useCallback(() => {
        return document.querySelector(`#${qrCodeContainerId} canvas`);
    }, [qrCodeContainerId]);
    const getQrCodeSvgElement = useCallback(() => {
        return document.querySelector(`#${qrCodeContainerId} svg`);
    }, [qrCodeContainerId]);
    const printQrCode = useCallback(async () => {
        printElement(getQrCodeSvgElement());
    }, [printElement, getQrCodeSvgElement]);
    const downloadQrCode = useCallback(async () => {
        console.log(getQrCodeCanvasElement());
        downloadCanvasAsImage(getQrCodeCanvasElement(), `Battery QR-Code ${selectedBattery?.id}`);
    }, [downloadCanvasAsImage, getQrCodeCanvasElement, selectedBattery?.id]);
    const qrCodeValue = useMemo(() => {
        if (!selectedBattery) {
            return '';
        }
        return location.href;
    }, [props.batteryId, props.manufacturerId, props.productLineId, selectedBattery]);
    return (_jsxs(Page, { name: "Battery Detail Page", children: [_jsx(Navbar, { title: title, backLink: backButton }), selectedBattery && (_jsxs(_Fragment, { children: [_jsxs("div", { style: { display: 'none' }, id: qrCodeContainerId, children: [_jsx(QRCodeCanvas, { width: '1.5cm', value: qrCodeValue }), _jsx(QRCodeSVG, { width: '1.5cm', value: qrCodeValue })] }), _jsx(BlockTitle, { children: "QR-Code (put on Battery)" }), _jsxs(List, { inset: true, strong: true, children: [_jsx(ListButton, { onClick: printQrCode, title: "Print" }), _jsx(ListButton, { onClick: downloadQrCode, title: "Download" })] })] }))] }));
}
