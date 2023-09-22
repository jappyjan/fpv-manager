import {Navbar, Block, Page, Link} from 'framework7-react';

export default function NotFoundPage() {
    return (
        <Page>
            <Navbar title="Not found" backLink="Back"/>
            <Block strong inset>
                <p>Sorry</p>
                <p>Requested content not found.</p>
                <Link href="/">Go back to home page</Link>
            </Block>
        </Page>
    );
}
