import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { List, ListButton, ListInput, LoginScreenTitle } from "framework7-react";
import { useCallback, useState } from "react";
export default function SetCredentialsForm() {
    const [url, setUrl] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [pin, setPin] = useState('');
    const onConnectClick = useCallback(async () => {
    }, [url, username, password, pin]);
    return (_jsxs(_Fragment, { children: [_jsx(LoginScreenTitle, { children: "Set Credentials" }), _jsxs(List, { form: true, strongIos: true, outlineIos: true, dividersIos: true, formStoreData: true, id: "set-credentials-form", children: [_jsx(ListInput, { type: "text", name: "url", label: "URL", placeholder: "url", value: url, onInput: (e) => setUrl(e.target.value) }), _jsx(ListInput, { type: "text", name: "username", label: "Username", placeholder: "username", value: username, onInput: (e) => setUsername(e.target.value) }), _jsx(ListInput, { type: "password", name: "password", label: "Password", placeholder: "password", value: password, onInput: (e) => setPassword(e.target.value) })] }), _jsx(List, { form: true, strongIos: true, outlineIos: true, dividersIos: true, children: _jsx(ListInput, { type: "number", name: "pin", label: "App-PIN", placeholder: "PIN", value: pin, onInput: (e) => setPin(e.target.value) }) }), _jsx(List, { children: _jsx(ListButton, { title: "Connect", onClick: onConnectClick }) })] }));
}
