import { all, put, race, takeLatest, take } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import {
  isSuccess as isCrudSuccess,
  isFailure as isCrudFailure,
  create,
  update,
} from 'lib/crud';

import {
  isSubmit as isFormSubmit,
  setResponse as setFormResponse,
  failure as formFailure,
} from 'controllers/Form/actions';
import { open as openSnackbar } from 'controllers/Snackbar/actions';
import { toTitleCase } from 'utils';
import { RECORD_FORM } from './names';

function* success(payload = {}, meta = {}) {
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
      message: `${toTitleCase(resource.slice(0, -1))} ${
        metaId ? 'updated' : 'created'
      }`,
    };
    yield put(openSnackbar({ ...defaultProps, ...snackbar }));
  }
}

function* submit(action) {
  const { meta, payload: data } = action;
  const { resource, id, authorize = true } = meta;

  if (id) {
    yield put(update(resource)({ id, data }, { authorize, key: RECORD_FORM }));
  } else {
    yield put(create(resource)({ data }, { authorize, key: RECORD_FORM }));
  }

  const crud = yield race({
    success: take(isCrudSuccess(RECORD_FORM)),
    failure: take(isCrudFailure(RECORD_FORM)),
  });

  if (crud.success) {
    yield put(setFormResponse(RECORD_FORM, crud.success.payload));
    yield* success(crud.success.payload, meta);
  } else {
    yield put(formFailure(RECORD_FORM, crud.failure.error, meta));
  }
}

export default function* watchSubmit() {
  yield all([takeLatest(isFormSubmit(RECORD_FORM), submit)]);
}
