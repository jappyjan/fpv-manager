import {
    LoginScreen, Page
} from "framework7-react";
import UnlockForm from "./unlock.form.tsx";
import SetCredentialsForm from "./set-credentials.form.tsx";


export function LoginView() {
    const dbCredentials = false;
    const hasCredentialsStored = false;

    return (
        <LoginScreen opened={!dbCredentials}>
            <Page loginScreen className="unlock-page">
                {hasCredentialsStored ? (
                    <UnlockForm/>
                ) : (
                    <SetCredentialsForm/>
                )}
            </Page>
        </LoginScreen>
    )
}
