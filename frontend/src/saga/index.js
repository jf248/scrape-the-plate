import { all } from 'redux-saga/effects';

import authorize from './authorize';
import failure from './failure';
import success from './success';

import scrape from 'controllers/Scraper/saga';
import recordForm from 'controllers/RecordForm/saga';
import loginForm from 'controllers/LoginForm/saga';

export default function*() {
  yield all([
    // Sagas from component controllers
    scrape(),
    recordForm(),
    loginForm(),

    // These sagas combine actions from differenct controller components:
    authorize(),
    failure(),
    success(),
  ]);
}
