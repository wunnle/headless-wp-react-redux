import React from 'react';
import { render, hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store'
import Blog from './components/Blog';
import ScrollToTop from './components/scrollToTop'
import withTracker from './withTracker'


const AppWithStore = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <ScrollToTop>
                <Route component={withTracker(Blog)} />
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