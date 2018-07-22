import { cancelled, put, takeLatest } from 'redux-saga/effects';

import {
  open as openSnackbar,
  close as closeSnackbar,
} from 'controllers/Snackbar/actions';
import { FAILURE as FORM_FAILURE, setError } from './actions';

function* formFailure(action) {
  const { error = {}, meta = {} } = action;
  const { nonFieldErrors, fieldErrors } = error;
  const { name, fieldErrorsMessage, networkErrorMessage } = meta;

  let message = null;

  try {
    if (fieldErrors) {
      yield put(setError(name, fieldErrors));
      message =
        fieldErrorsMessage ||
        "Something wasn't right, check the error messages.";
      //TODO: remove
      console.warn('Form failure in formFailure saga:', error);
    }

    if (nonFieldErrors) {
      message = nonFieldErrors;
    }

    if (!message) {
      console.error('Form failure in formFailure saga:', error);
    }
    message =
      message ||
      networkErrorMessage ||
      'Sorry, something went wrong with that request. Try later.';
    yield put(openSnackbar({ message }));
  } finally {
    if (yield cancelled()) {
      yield put(closeSnackbar());
    }
  }
}

export default function* watchFailures() {
  yield takeLatest(FORM_FAILURE, formFailure);
}
