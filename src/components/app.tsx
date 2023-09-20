// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {getDevice} from 'framework7/lite-bundle';
import {
    f7,
    f7ready,
    App,
    View, Link, Toolbar,
} from 'framework7-react';

import capacitorApp from '../capacitor-app';
import routes from '../pages/routes';
import {useEffect, useState} from "react";
import {init as initRxDb} from "../rxdb";
import {Provider as RxDbProvider} from "rxdb-hooks";
import {RxDatabase} from "rxdb";

const MyApp = () => {
    const device = getDevice();

    const [db, setDb] = useState<null | RxDatabase>(null);

    useEffect(() => {
        initRxDb().then(setDb);
    }, []);

    // Framework7 Parameters
    const f7params = {
        name: 'FPV Manager', // App name
        theme: 'auto', // Automatic theme detection

        darkMode: true,

        // App routes
        routes,

        // Register service worker (only on production build)
        serviceWorker: process.env.NODE_ENV === 'production' ? {
            path: '/service-worker.js',
        } : {},
        // Input settings
        input: {
            scrollIntoViewOnFocus: device.capacitor,
            scrollIntoViewCentered: device.capacitor,
        },
        // Capacitor Statusbar settings
        statusbar: {
            iosOverlaysWebView: true,
            androidOverlaysWebView: false,
        },

        browserHistory: true,
        browserHistoryRoot: '/',
    };

    f7ready(() => {
        if (f7.device.capacitor) {
            // Init capacitor APIs (see capacitor-app.js)
            capacitorApp.init(f7);
        }

        // Call F7 APIs here
    });

    if (!db) return (<div>Loading...</div>);

    return (
        <RxDbProvider db={db ?? undefined}>
            <App {...f7params}>
                <View main
                      url="/"
                      className="safe-areas"
                      iosSwipeBack={true}
                      iosDynamicNavbar={true}
                      iosAnimateNavbarBackIcon={true}

                      browserHistory={true}
                >
                </View>
            </App>
        </RxDbProvider>
    )
}
export default MyApp;