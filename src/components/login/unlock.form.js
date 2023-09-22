import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { f7, List, ListButton, ListInput, LoginScreenTitle } from "framework7-react";
import { useCallback, useState } from "react";
export default function UnlockForm() {
    const [pin, setPin] = useState('');
    const onClickUnlock = useCallback(() => {
    }, [pin]);
    const onClickClearCredentials = useCallback(() => {
        f7.dialog.confirm('Are you sure you want to clear the stored database credentials?', () => {
        });
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(LoginScreenTitle, { children: "Unlock" }), _jsx(List, { form: true, strongIos: true, outlineIos: true, dividersIos: true, children: _jsx(ListInput, { type: "number", label: "PIN", name: "unlock-pin", placeholder: "PIN", value: pin, onInput: (e) => setPin(e.target.value) }) }), _jsxs(List, { children: [_jsx(ListButton, { title: "Unlock", onClick: onClickUnlock }), _jsx(ListButton, { title: "Clear Credentials", onClick: onClickClearCredentials })] })] }));
}
