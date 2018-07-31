import { cancelled, put, takeLatest } from 'redux-saga/effects';

import * as snackbar from 'controllers/snackbar';
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
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Form failure in formFailure saga:', error); // eslint-disable-line no-console
      }
    }

    if (nonFieldErrors) {
      message = nonFieldErrors;
    }

    if (!message) {
      console.error('Form failure in formFailure saga:', error); // eslint-disable-line no-console
    }
    message =
      message ||
      networkErrorMessage ||
      'Sorry, something went wrong with that request. Try later.';
    yield put(snackbar.open({ message }));
  } finally {
    if (yield cancelled()) {
      yield put(snackbar.close());
    }
  }
}

export function* saga() {
  yield takeLatest(FORM_FAILURE, formFailure);
}
