import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { reset as resetCrud } from 'lib/crud';

import { isLoginSuccess, isLogoutSuccess } from 'lib/auth';

function* reset(action) {
  // Reset crud redux state on either login or logout
  yield put(resetCrud());

  // Navigate home on logout
  if (isLogoutSuccess(action)) {
    yield put(push('/'));
  }
}

const isLogInOrOut = action => {
  return isLoginSuccess(action) || isLogoutSuccess(action);
};

export default function* watchLogInOrOut() {
  yield takeLatest(isLogInOrOut, reset);
}
