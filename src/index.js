import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Router } from 'react-router-dom'
import store, { history } from './store'
import Blog from './components/Blog';

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Blog />
        </ConnectedRouter>
    </Provider>,
  document.getElementById('root')
)