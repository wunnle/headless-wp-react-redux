import React from 'react';
import { render, hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store'
import Blog from './components/Blog';
import ScrollToTop from './components/scrollToTop'


const AppWithStore = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <ScrollToTop>
                <Blog />
            </ScrollToTop>
        </ConnectedRouter>
    </Provider>
)

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
    hydrate(<AppWithStore />, rootElement);
} else {
    render(<AppWithStore />, rootElement);
}