import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import { verify } from 'lib/auth';

import rootReducer from './reducer';
import rootSaga from './saga';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const history = createBrowserHistory();

const monitor = window['__SAGA_MONITOR_EXTENSION__'];
const sagaMiddleware = createSagaMiddleware({ sagaMonitor: monitor });
const initialState = undefined;

const store = createStore(
  connectRouter(history)(rootReducer),
  initialState,
  composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
);

// Start-up sagas
let sagaTask = sagaMiddleware.run(rootSaga);

if (module.hot) {
  module.hot.accept('./reducer', () => {
    store.replaceReducer(connectRouter(history)(rootReducer));
  });
  module.hot.accept('./saga', () => {
    sagaTask.cancel();
    sagaTask.done.then(() => {
      sagaTask = sagaMiddleware.run(rootSaga);
    });
    store.replaceReducer(connectRouter(history)(rootReducer));
  });
}

// Verify user token if there is one
store.dispatch(verify());

if (module.hot) {
  module.hot.accept('./reducer', () => {
    store.replaceReducer(connectRouter(history)(rootReducer));
  });
  module.hot.accept('./saga', () => {
    store.replaceReducer(connectRouter(history)(rootReducer));
  });
}

export { store, history };
