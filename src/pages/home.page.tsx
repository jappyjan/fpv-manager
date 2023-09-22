import {
    Navbar,
    NavTitleLarge,
    Block,
    Page,
} from 'framework7-react';

export default function HomePage() {
    return (
        <Page name="home">
            {/* Top Navbar */}
            <Navbar large sliding={false}>
                <NavTitleLarge>FPV Manager</NavTitleLarge>
            </Navbar>

            {/* Page content */}
            <Block>
                <p>This is an example of tabs-layout application. The main point of such tabbed layout is that
                    each
                    tab
                    contains independent view with its own routing and navigation.</p>

                <p>Each tab/view may have different layout, different navbar type (dynamic, fixed or static) or
                    without
                    navbar like this tab.</p>
            </Block>
        </Page>
    );
}
