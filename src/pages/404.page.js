import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navbar, Block, Page, Link } from 'framework7-react';
export default function NotFoundPage() {
    return (_jsxs(Page, { children: [_jsx(Navbar, { title: "Not found", backLink: "Back" }), _jsxs(Block, { strong: true, inset: true, children: [_jsx("p", { children: "Sorry" }), _jsx("p", { children: "Requested content not found." }), _jsx(Link, { href: "/", children: "Go back to home page" })] })] }));
}
