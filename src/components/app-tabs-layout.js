import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, Page, Tab, Tabs, Toolbar } from "framework7-react";
export default function AppTabsLayout() {
    return (_jsxs(Page, { pageContent: false, children: [_jsxs(Toolbar, { bottom: true, tabbar: true, icons: true, children: [_jsx(Link, { tabLink: true, href: "/", routeTabId: "home", iconIos: "f7:house_fill", iconMd: "material:home", children: "Home" }), _jsx(Link, { tabLink: true, href: "/battery_manufacturers", routeTabId: "batteries", iconIos: "f7:battery_25", iconMd: "material:battery_3_bar", children: "Batteries" }), _jsx(Link, { tabLink: true, href: "/drones", routeTabId: "drones", iconIos: "f7:airplane", iconMd: "material:airplanemode_active", children: "Drones" })] }), _jsxs(Tabs, { routable: true, children: [_jsx(Tab, { className: "page-content", id: "home" }), _jsx(Tab, { className: "page-content", id: "batteries" }), _jsx(Tab, { className: "page-content", id: "drones" })] })] }));
}
