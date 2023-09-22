import {List, ListButton, ListInput, LoginScreenTitle} from "framework7-react";
import {useCallback, useState} from "react";

export default function SetCredentialsForm() {
    const [url, setUrl] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [pin, setPin] = useState('');

    const onConnectClick = useCallback(async () => {
    }, [url, username, password, pin]);

    return (<>
            <LoginScreenTitle>Set Credentials</LoginScreenTitle>

            <List form
                  strongIos
                  outlineIos
                  dividersIos
                  formStoreData
                  id="set-credentials-form"
            >
                <ListInput
                    type="text"
                    name="url"
                    label="URL"
                    placeholder="url"
                    value={url}
                    onInput={(e) => setUrl(e.target.value)}
                />
                <ListInput
                    type="text"
                    name="username"
                    label="Username"
                    placeholder="username"
                    value={username}
                    onInput={(e) => setUsername(e.target.value)}
                />
                <ListInput
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="password"
                    value={password}
                    onInput={(e) => setPassword(e.target.value)}
                />
            </List>

            <List form
                  strongIos
                  outlineIos
                  dividersIos
            >
                <ListInput
                    type="number"
                    name="pin"
                    label="App-PIN"
                    placeholder="PIN"
                    value={pin}
                    onInput={(e) => setPin(e.target.value)}
                />
            </List>

            <List>
                <ListButton title="Connect" onClick={onConnectClick}/>
            </List>
        </>
    )
}
