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
  open as openLogin,
  close as closeLogin,
  isClose,
} from 'controllers/LoginModal';
import { isLoginSuccess } from 'controllers/LoginForm/actions';

function* authorize() {
  try {
    // Alreadry logged in?
    if (yield select(isLoggedIn)) {
      yield put(authorizeSuccess());
      return;
    }

    // Open the login page. Wait for a successful login or the login page
    // closed.
    yield put(openLogin());
    const { success } = yield race({
      success: take(isLoginSuccess),
      failure: take(isClose),
    });
    if (success) {
      yield put(authorizeSuccess());
    } else {
      yield put(authorizeFailure());
    }
  } finally {
    if (yield cancelled()) {
      yield put(closeLogin());
      yield put(authorizeFailure());
    }
  }
}

export default function* watchRequestAuthorize() {
  yield takeLatest(isRequestAuthorize, authorize);
}
