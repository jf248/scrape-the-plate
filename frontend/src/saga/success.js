import { all, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { open as openSnackbar } from 'controllers/Snackbar/actions';
import { SUCCESS as SCRAPER_SUCCESS } from 'controllers/Scraper/actions';
import { SUCCESS as RECORD_FORM_SUCCESS } from 'controllers/RecordForm/actions';
import { isLoginSuccess } from 'controllers/LoginForm/actions';
import { close as closeLogin } from 'controllers/LoginModal/actions';
import { toTitleCase } from 'utils'

function* scraperSuccess() {
  yield put(openSnackbar({ message: 'Scraped! Make edits and save.' }));
}

function* recordFormSuccess(action) {
  const { payload, meta = {} } = action;
  const {
    data: { id },
  } = payload;
  const { onSuccess = {}, resource, id: metaId } = meta;
  const { snackbar, redirect } = onSuccess;

  if (redirect) {
    const { to } = redirect;
    const defaultTo = `/${resource}/${id}`;
    yield put(push(to || defaultTo));
  }

  if (snackbar) {
    const defaultProps = {
      message: `${toTitleCase(resource.slice(0, -1))} ${metaId ? 'updated' : 'created'}`,
    };
    yield put(openSnackbar({ ...defaultProps, ...snackbar }));
  }
  return;
}

function* loginSuccess() {
  yield put(closeLogin());
}

export default function* watchSuccess() {
  yield all([
    yield takeLatest(SCRAPER_SUCCESS, scraperSuccess),
    yield takeLatest(RECORD_FORM_SUCCESS, recordFormSuccess),
    yield takeLatest(isLoginSuccess, loginSuccess),
  ]);
}
