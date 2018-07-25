import { all } from 'redux-saga/effects';

import { makeSaga as makeCrudSaga } from 'lib/crud';
import { makeSaga as makeAuthSaga } from 'lib/auth';

import form from 'controllers/Form/saga';
import loginForm from 'controllers/LoginForm/saga';
import crud from 'controllers/Crud/saga';
import recordForm from 'controllers/RecordForm/saga';
import scrape from 'controllers/Scraper/saga';
import view from 'controllers/View/saga';
import authorize from './authorize';
import logOut from './logOut';
import { authProvider, dataProvider } from 'config';

function* rootSaga() {
  yield all([
    // lib sagas
    makeCrudSaga(dataProvider)(),
    makeAuthSaga(authProvider)(),

    // Sagas from component controllers
    form(),
    loginForm(),
    crud(),
    recordForm(),
    scrape(),
    view(),

    // Additional sagas
    authorize(),
    logOut(),
  ]);
}

export default rootSaga;
