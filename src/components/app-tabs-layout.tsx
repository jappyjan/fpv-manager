import {Link, Navbar, Page, Tab, Tabs, Toolbar} from "framework7-react";

export default function AppTabsLayout() {
    return (
        <Page pageContent={false}>
            <Toolbar bottom tabbar>
                <Link tabLink href="/" routeTabId="home">
                    Home
                </Link>
                <Link tabLink href="/battery-manufacturers" routeTabId="batteries">
                    Batteries
                </Link>
                <Link tabLink href="/drones" routeTabId="drones">
                    Drones
                </Link>
            </Toolbar>
            <Tabs routable>
                <Tab className="page-content" id="home" />
                <Tab className="page-content" id="batteries" />
                <Tab className="page-content" id="drones" />
            </Tabs>
        </Page>
    )
}