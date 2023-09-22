import {f7, List, ListButton, ListInput, LoginScreenTitle} from "framework7-react";
import {useCallback, useState} from "react";

export default function UnlockForm() {
    const [pin, setPin] = useState('');

    const onClickUnlock = useCallback(() => {
    }, [pin]);

    const onClickClearCredentials = useCallback(() => {
        f7.dialog.confirm('Are you sure you want to clear the stored database credentials?', () => {
        });
    }, []);

    return (<>
            <LoginScreenTitle>Unlock</LoginScreenTitle>

            <List form
                  strongIos
                  outlineIos
                  dividersIos
            >
                <ListInput
                    type="number"
                    label="PIN"
                    name="unlock-pin"
                    placeholder="PIN"
                    value={pin}
                    onInput={(e) => setPin(e.target.value)}
                />
            </List>
            <List>
                <ListButton title="Unlock" onClick={onClickUnlock}/>
                <ListButton title="Clear Credentials" onClick={onClickClearCredentials}/>
            </List>
        </>
    )
}
