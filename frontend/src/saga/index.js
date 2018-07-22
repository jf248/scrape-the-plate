import { all } from 'redux-saga/effects';

import authorize from './authorize';
import logOut from './logOut';

import form from 'controllers/Form/saga';
import loginForm from 'controllers/LoginForm/saga';
import recordDestroy from 'controllers/RecordDestroy/saga';
import recordForm from 'controllers/RecordForm/saga';
import scrape from 'controllers/Scraper/saga';
import view from 'controllers/View/saga';

export default function*() {
  yield all([
    // Sagas from component controllers
    form(),
    loginForm(),
    recordDestroy(),
    recordForm(),
    scrape(),
    view(),

    // Additional sagas
    authorize(),
    logOut(),
  ]);
}
