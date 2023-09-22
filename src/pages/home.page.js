import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navbar, NavTitleLarge, Block, Page, } from 'framework7-react';
export default function HomePage() {
    return (_jsxs(Page, { name: "home", children: [_jsx(Navbar, { large: true, sliding: false, children: _jsx(NavTitleLarge, { children: "FPV Manager" }) }), _jsxs(Block, { children: [_jsx("p", { children: "This is an example of tabs-layout application. The main point of such tabbed layout is that each tab contains independent view with its own routing and navigation." }), _jsx("p", { children: "Each tab/view may have different layout, different navbar type (dynamic, fixed or static) or without navbar like this tab." })] })] }));
}
