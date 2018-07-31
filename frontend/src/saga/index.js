import { all } from 'redux-saga/effects';

import * as crud from 'lib/crud';
import * as auth from 'lib/auth';

import * as form from 'controllers/form';
import * as loginForm from 'controllers/login-form';
import * as crudController from 'controllers/crud';
import * as recordForm from 'controllers/record-form';
import * as scraper from 'controllers/scraper';
import * as view from 'controllers/view';
import * as authorize from './authorize';
import * as logOut from './logOut';
import { authProvider, dataProvider } from 'config';

export function* saga() {
  yield all([
    // lib sagas
    crud.saga(dataProvider),
    auth.saga(authProvider),

    // Sagas from component controllers
    form.saga(),
    loginForm.saga(),
    crudController.saga(),
    recordForm.saga(),
    scraper.saga(),
    view.saga(),

    // Additional sagas
    authorize.saga(),
    logOut.saga(),
  ]);
}
