import { all, put, race, takeLatest, take } from 'redux-saga/effects';

import * as auth from 'lib/auth';

import * as form from 'controllers/form';
import * as modal from 'controllers/modal';
import { LOGIN_MODAL } from 'components/frame';
import { LOGIN, SIGNUP } from './names';

function* submit(action) {
  const { meta, payload: data } = action;
  const { isLogin, name } = meta;

  if (isLogin) {
    yield put(auth.login(data));
  } else {
    yield put(auth.signup(data));
  }

  const authRace = yield race({
    success: take(auth.isLoginSuccess),
    failure: take(auth.isLoginFailure),
  });

  if (authRace.failure) {
    yield put(form.failure(name, authRace.failure.error));
  } else {
    yield success();
  }
}

function* success() {
  yield put(modal.close(LOGIN_MODAL));
}

export function* saga() {
  yield all([
    takeLatest([form.isSubmit(LOGIN), form.isSubmit(SIGNUP)], submit),
  ]);
}
