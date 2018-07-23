import { all, put, race, takeLatest, take } from 'redux-saga/effects';

import { isLoginSuccess, isLoginFailure, login, signup } from 'lib/auth';
import {
  isSubmit as isFormSubmit,
  failure as formFailure,
} from 'controllers/Form/actions';
import { close as closeModal } from 'controllers/Modal/actions';

import { LOGIN, SIGNUP } from './names';
import { LOGIN_MODAL } from 'names';

function* submit(action) {
  const { meta, payload: data } = action;
  const { isLogin, name } = meta;

  if (isLogin) {
    yield put(login(data));
  } else {
    yield put(signup(data));
  }

  const auth = yield race({
    success: take(isLoginSuccess),
    failure: take(isLoginFailure),
  });

  if (auth.failure) {
    yield put(formFailure(name, auth.failure.error));
  } else {
    yield success();
  }
}

function* success() {
  yield put(closeModal(LOGIN_MODAL));
}

export default function* watchLoginForm() {
  yield all([takeLatest([isFormSubmit(LOGIN), isFormSubmit(SIGNUP)], submit)]);
}
