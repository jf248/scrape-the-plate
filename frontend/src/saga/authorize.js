import {
  put,
  take,
  takeLatest,
  race,
  cancelled,
  select,
} from 'redux-saga/effects';

import {
  isRequestAuthorize,
  authorizeSuccess,
  authorizeFailure,
} from 'lib/crud';

import { isLoggedIn } from 'lib/auth';

import {
  open as openModal,
  close as closeModal,
} from 'controllers/Modal/actions';
import { isClose } from 'controllers/Modal/effects';
import { isLoginSuccess } from 'controllers/LoginForm/actions';
import { LOGIN_MODAL } from 'names';

function* authorize() {
  try {
    // Alreadry logged in?
    if (yield select(isLoggedIn)) {
      yield put(authorizeSuccess());
      return;
    }

    // Open the login page. Wait for a successful login or the login page
    // closed.
    yield put(openModal(LOGIN_MODAL));
    const { success } = yield race({
      success: take(isLoginSuccess),
      failure: take(isClose(LOGIN_MODAL)),
    });
    if (success) {
      yield put(authorizeSuccess());
    } else {
      yield put(authorizeFailure());
    }
  } finally {
    if (yield cancelled()) {
      yield put(closeModal(LOGIN_MODAL));
      yield put(authorizeFailure());
    }
  }
}

export default function* watchRequestAuthorize() {
  yield takeLatest(isRequestAuthorize, authorize);
}
