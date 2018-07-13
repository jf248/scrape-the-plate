import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { reset as resetCrud } from 'lib/crud';

import { isLogoutSuccess } from 'lib/auth';

function* reset() {
  yield put(resetCrud());
  yield put(push('/'));
}


export default function* watchLogOut() {
  yield takeLatest(isLogoutSuccess, reset);
}
