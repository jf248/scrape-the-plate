import React from 'react';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import { BaseApp } from 'lib/mui-app';
import { reducer as crudReducer, makeSaga as makeCrudSaga } from 'lib/crud';
import {
  reducer as authReducer,
  makeSaga as makeAuthSaga,
  verify,
} from 'lib/auth';
import { reducer as queueReducer } from 'lib/redux-queue';
import { reducer as formReducer } from 'lib/redux-form-lite';
import is404Reducer from 'controllers/Is404/reducer'

import { Route } from 'components/frame';
import { routes, resources, authProvider, dataProvider } from 'config';
import customSaga from 'saga';

function* rootSaga() {
  yield all([
    makeCrudSaga(dataProvider)(),
    makeAuthSaga(authProvider)(),
    customSaga(),
  ]);
}

const monitor = window['__SAGA_MONITOR_EXTENSION__'];
const sagaMiddleware = createSagaMiddleware({ sagaMonitor: monitor });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  crud: crudReducer(resources),
  auth: authReducer,
  queue: queueReducer,
  form: formReducer,
  is404: is404Reducer,
});

const history = createBrowserHistory();

const store = createStore(
  connectRouter(history)(rootReducer),
  undefined,
  composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
);

// Start-up sagas
sagaMiddleware.run(rootSaga);

// Verify user token if there is one
store.dispatch(verify());

function App() {
  return (
    <BaseApp
      store={store}
      RouteComponent={Route}
      routes={routes}
      history={history}
    />
  );
}

export default App;
