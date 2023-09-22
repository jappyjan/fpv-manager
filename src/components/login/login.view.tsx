import {
    f7,
    Fab,
    Icon,
    List,
    ListButton,
    ListInput,
    LoginScreen,
    LoginScreenTitle,
    Page
} from "framework7-react";
import {useCallback, useEffect, useState} from "react";
import {useAuthStore} from "../../firebase/auth.state.ts";
import {useRxDB} from "rxdb-hooks";
import {sendSignInLinkToEmail, ActionCodeSettings, isSignInWithEmailLink, signInWithEmailLink} from 'firebase/auth';
import useSignInWithGithub from "./use-sign-in-with-github.tsx";


export function LoginView() {
    const rxdb = useRxDB();
    const {firebaseAuth, isAuthenticated} = useAuthStore(rxdb);

    const [email, setEmail] = useState(localStorage.getItem('emailForSignIn') || '');

    const onClickLogin = useCallback(async () => {
        const actionCodeSettings: ActionCodeSettings = {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be in the authorized domains list in the Firebase Console.
            url: location.origin + '?finish-login=true',
            // This must be true.
            handleCodeInApp: true,
        };

        try {
            await sendSignInLinkToEmail(firebaseAuth, email, actionCodeSettings);
        } catch (e) {
            const error = e as Error;
            f7.dialog.alert(error.message);
            console.error(error);
            return;
        }
        localStorage.setItem('emailForSignIn', email);
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
            email = await new Promise<string>((resolve) => {
                f7.dialog.prompt(
                    'Please provide your email for confirmation',
                    'Login',
                    (email) => {
                        resolve(email);
                    },
                    () => {
                        resolve('');
                    }
                );
            });
        }

        if (!email) {
            return;
        }

        try {
            await signInWithEmailLink(firebaseAuth, email, location.href)
        } catch (e) {
            const error = e as Error;
            f7.dialog.alert(error.message);
            console.error(error);
            return;
        }
        window.localStorage.removeItem('emailForSignIn');
    }, [firebaseAuth]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);

        if (!searchParams.has('finish-login')) {
            return;
        }

        finishLogin();
    }, [finishLogin]);

    const signInWithGithub = useSignInWithGithub();

    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }

        f7.loginScreen.close();
    }, [isAuthenticated]);

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
                    <ListButton title="Sign in with GitHub"
                                onClick={signInWithGithub}
                    />
                </List>
            </Page>
        </LoginScreen>
    )
}
