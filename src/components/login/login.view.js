import { jsx as _jsx } from "react/jsx-runtime";
import { LoginScreen, Page } from "framework7-react";
import UnlockForm from "./unlock.form.tsx";
import SetCredentialsForm from "./set-credentials.form.tsx";
export function LoginView() {
    const dbCredentials = false;
    const hasCredentialsStored = false;
    return (_jsx(LoginScreen, { opened: !dbCredentials, children: _jsx(Page, { loginScreen: true, className: "unlock-page", children: hasCredentialsStored ? (_jsx(UnlockForm, {})) : (_jsx(SetCredentialsForm, {})) }) }));
}
