import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';

import rootReducer from '../reducers/indexReducer';
import DevTools from '../containers/DevTools';

export const history = createHistory();
const middleware = routerMiddleware(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(
        middleware,
        thunk
      ),
    )
  );

  if(module.hot) {
    module.hot.accept('../reducers/indexReducer', () =>
      store.replaceReducer(require('../reducers/indexReducer').default)
    );
  }

  return store;
}
