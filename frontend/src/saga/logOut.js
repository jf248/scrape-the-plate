import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import * as crud from 'lib/crud';
import * as auth from 'lib/auth';

function* reset() {
  yield put(crud.reset());
  yield put(push('/'));
}

export function* saga() {
  yield takeLatest(auth.isLogoutSuccess, reset);
}
