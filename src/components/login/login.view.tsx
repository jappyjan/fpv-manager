import {
    Fab, Icon, List, ListButton, ListInput,
    LoginScreen, LoginScreenTitle, Page
} from "framework7-react";
import {useCallback, useEffect, useState} from "react";
import {useAuthStore} from "../../firebase/auth.state.ts";
import {useRxDB} from "rxdb-hooks";
import {sendSignInLinkToEmail, ActionCodeSettings, isSignInWithEmailLink, signInWithEmailLink} from 'firebase/auth';


export function LoginView() {
    const rxdb = useRxDB();
    const {firebaseAuth} = useAuthStore(rxdb);

    const [email, setEmail] = useState(localStorage.getItem('emailForSignIn') || '');

    const onClickLogin = useCallback(async () => {
        const actionCodeSettings: ActionCodeSettings = {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be in the authorized domains list in the Firebase Console.
            url: location.origin + '?finish-login=true',
            // This must be true.
            handleCodeInApp: true,
        };

        await sendSignInLinkToEmail(firebaseAuth, email, actionCodeSettings);
        localStorage.setItem('emailForSignIn', email);

        // TODO: error handling
    }, [email, firebaseAuth]);

    const finishLogin = useCallback(async () => {
        // Confirm the link is a sign-in with email link.
        if (!isSignInWithEmailLink(firebaseAuth, location.href)) {
            return;
        }

        let email = localStorage.getItem('emailForSignIn');
        if (!email) {
            // User opened the link on a different device. To prevent session fixation
            // attacks, ask the user to provide the associated email again. For example:
            // TODO: use a modal
            email = window.prompt('Please provide your email for confirmation');
        }

        if (!email) {
            return;
        }

        await signInWithEmailLink(firebaseAuth, email, location.href)
        window.localStorage.removeItem('emailForSignIn');
    }, [firebaseAuth]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);

        if (!searchParams.has('finish-login')) {
            return;
        }

        finishLogin();
    }, [finishLogin]);

    return (
        <LoginScreen id="login-screen">
            <Page loginScreen>
                <Fab position="right-top"
                     slot="fixed"
                     color="red"
                     className='login-screen-close'
                     data-login-screen="#login-screen"
                >
                    <Icon ios="f7:xmark"
                          md="material:close"
                    />
                </Fab>

                <LoginScreenTitle>Login and Sync</LoginScreenTitle>

                <List form
                      strongIos
                      outlineIos
                      dividersIos
                >
                    <ListInput
                        type="email"
                        label="E-Mail"
                        name="email"
                        placeholder="E-Mail"
                        value={email}
                        onInput={(e) => setEmail(e.target.value)}
                    />
                </List>
                <List>
                    <ListButton title="Login" onClick={onClickLogin}/>
                </List>
            </Page>
        </LoginScreen>
    )
}
