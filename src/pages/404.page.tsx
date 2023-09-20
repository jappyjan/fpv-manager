import {Navbar, Block, Page} from 'framework7-react';

export default function NotFoundPage() {
    return (
        <Page>
            <Navbar title="Not found" backLink="Back"/>
            <Block strong inset>
                <p>Sorry</p>
                <p>Requested content not found.</p>
            </Block>
        </Page>
    );
}
