import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import rootReducer from './reducers';


export const history = createBrowserHistory();
const initialState = {};
const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension =  window.__REDUX_DEVTOOLS_EXTENSION__


  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const preloadedState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

const store =  createStore(rootReducer(history), preloadedState || initialState, composedEnhancers);

window.snapSaveState = () => ({
  __PRELOADED_STATE__: store.getState()
});

export default store