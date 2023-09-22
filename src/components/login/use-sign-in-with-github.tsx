import {getAuth, GithubAuthProvider, signInWithPopup} from "firebase/auth";
import {useCallback, useMemo} from "react";

export default function useSignInWithGithub() {
    const provider = useMemo(() => new GithubAuthProvider(), []);
    const auth = useMemo(() => getAuth(), []);

    return useCallback(async () => {
        await signInWithPopup(auth, provider);
    }, [auth, provider]);
}
