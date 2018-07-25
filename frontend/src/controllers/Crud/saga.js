import { all, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import {
  isSuccess as isCrudSuccess,
  isFailure as isCrudFailure,
} from 'lib/crud';

import { open as openSnackbar } from 'controllers/Snackbar/actions';
import { toTitleCase } from 'utils';
import { CRUD_CONTROLLER } from './names';

function* success(action) {
  const { meta } = action;
  const { onSuccess = {}, resource } = meta;
  const { snackbar, redirect } = onSuccess;
  if (redirect) {
    const { to } = redirect;
    const defaultTo = `/${resource}/`;
    yield put(push(to || defaultTo));
  }

  if (snackbar) {
    const defaultProps = {
      message: `${toTitleCase(resource.slice(0, -1))} deleted`,
    };
    yield put(openSnackbar({ ...defaultProps, ...snackbar }));
  }
}

function* failure(action) {
  const { meta } = action;
  const { onFailure = {}, resource } = meta;
  const { snackbar } = onFailure;

  if (snackbar) {
    const defaultProps = {
      message: `Sorry, couldn't delete ${resource.slice(0, -1)}`,
    };
    yield put(openSnackbar({ ...defaultProps, ...snackbar }));
  }
}

export default function* watchRecordDestroy() {
  yield all([
    takeLatest(isCrudSuccess(CRUD_CONTROLLER), success),
    takeLatest(isCrudFailure(CRUD_CONTROLLER), failure),
  ]);
}
