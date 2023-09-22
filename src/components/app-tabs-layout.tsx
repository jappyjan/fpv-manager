import {Button, Link, Page, Tab, Tabs, Toolbar} from "framework7-react";
import {useAuthStore} from "../firebase/auth.state.ts";
import {useRxDB} from "rxdb-hooks";

export default function AppTabsLayout() {
    const rxDb = useRxDB();
    const {isAuthenticated} = useAuthStore(rxDb);

    return (
        <Page pageContent={false}>
            <Toolbar bottom tabbar icons>
                <Link tabLink
                      href="/"
                      routeTabId="home"
                      iconIos="f7:house_fill"
                      iconMd="material:home"
                >
                    Home
                </Link>
                <Link tabLink
                      href="/battery_manufacturers"
                      routeTabId="batteries"
                      iconIos="f7:battery_25"
                      iconMd="material:battery_3_bar"
                >
                    Batteries
                </Link>
                <Link tabLink
                      href="/drones"
                      routeTabId="drones"
                      iconIos="f7:airplane"
                      iconMd="material:airplanemode_active"
                >
                    Drones
                </Link>
                {!isAuthenticated && (
                    <Button iconIos="f7:person"
                            iconMd="material:person"
                            loginScreenOpen="#login-screen"
                            className='tab-link'
                    >
                        Login
                    </Button>
                )}
            </Toolbar>
            <Tabs routable>
                <Tab className="page-content" id="home"/>
                <Tab className="page-content" id="batteries"/>
                <Tab className="page-content" id="drones"/>
            </Tabs>
        </Page>
    )
}
