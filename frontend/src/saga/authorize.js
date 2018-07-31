import {
  put,
  take,
  takeLatest,
  race,
  cancelled,
  select,
} from 'redux-saga/effects';

import * as crud from 'lib/crud';
import * as auth from 'lib/auth';

import * as modal from 'controllers/modal';
import * as loginForm from 'controllers/login-form';
import { LOGIN_MODAL } from 'components/frame';

function* authorize() {
  try {
    // Alreadry logged in?
    if (yield select(auth.isLoggedIn)) {
      yield put(crud.authorizeSuccess());
      return;
    }

    // Open the login page. Wait for a successful login or the login page
    // closed.
    yield put(modal.open(LOGIN_MODAL));
    const { success } = yield race({
      success: take(loginForm.isLoginSuccess),
      failure: take(modal.isClose(LOGIN_MODAL)),
    });
    if (success) {
      yield put(crud.authorizeSuccess());
    } else {
      yield put(crud.authorizeFailure());
    }
  } finally {
    if (yield cancelled()) {
      yield put(modal.close(LOGIN_MODAL));
      yield put(crud.authorizeFailure());
    }
  }
}

export function* saga() {
  yield takeLatest(crud.isRequestAuthorize, authorize);
}
