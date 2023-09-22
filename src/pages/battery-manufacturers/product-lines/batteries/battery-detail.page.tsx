import {BlockTitle, List, ListButton, Navbar, Page} from 'framework7-react';
import {useRxData} from "rxdb-hooks";
import {RxDBCollectionNames} from "../../../../rxdb";
import {useCallback, useMemo} from "react";
import {
    BatteryProductLine,
} from "../../../../rxdb/schemas/batteries/battery_product_lines.schema.ts";
import {Battery} from "../../../../rxdb/schemas/batteries/batteries.schema.ts";
import usePrintElementHook from "../../../../hooks/use-print-element.hook.ts";
import {QRCodeCanvas, QRCodeSVG} from 'qrcode.react';
import ShortUniqueId from "short-unique-id";
import useDownloadCanvasAsImage from "../../../../hooks/use-download-canvas-as-image.hook.ts";

interface Props {
    manufacturerId: string;
    productLineId: string;
    batteryId: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    f7router: any;
}

export default function BatteryDetailPage(props: Props) {
    const {
        result: [selectedProductLine]
    } = useRxData<BatteryProductLine>(
        RxDBCollectionNames.BATTERY_PRODUCT_LINES,
        (collection) => collection
            .findOne()
            .where('id')
            .equals(props.productLineId)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .and({manufacturer_id: props.manufacturerId})
    );

    const {
        result: [selectedBattery]
    } = useRxData<Battery>(
        RxDBCollectionNames.BATTERIES,
        (collection) => collection
            .findOne()
            .where('id')
            .equals(props.batteryId)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .and({product_line_id: props.productLineId})
    );

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
        return document.querySelector(`#${qrCodeContainerId} canvas`) as HTMLCanvasElement;
    }, [qrCodeContainerId]);

    const getQrCodeSvgElement = useCallback(() => {
        return document.querySelector(`#${qrCodeContainerId} svg`) as HTMLElement;
    }, [qrCodeContainerId]);

    const printQrCode = useCallback(async () => {
        printElement(getQrCodeSvgElement() as HTMLElement);
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

    return (
        <Page name="Battery Detail Page">
            <Navbar title={title}
                    backLink={backButton}
            />

            {selectedBattery && (<>
                <div style={{display: 'none'}} id={qrCodeContainerId}>
                    <QRCodeCanvas width={'1.5cm'}
                                  value={qrCodeValue}
                    />
                    <QRCodeSVG width={'1.5cm'}
                               value={qrCodeValue}
                    />
                </div>

                <BlockTitle>QR-Code (put on Battery)</BlockTitle>
                <List inset strong>
                    <ListButton onClick={printQrCode} title="Print"/>
                    <ListButton onClick={downloadQrCode} title="Download"/>
                </List>
            </>)}
        </Page>
    )
        ;
}
