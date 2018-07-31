import { all, put, race, takeLatest, take } from 'redux-saga/effects';
import * as router from 'connected-react-router';

import * as crud from 'lib/crud';

import * as form from 'controllers/form';
import * as snackbarController from 'controllers/snackbar';
import * as modalController from 'controllers/modal';
import { toTitleCase } from 'utils';
import { RECORD_FORM } from './names';

function* success(payload = {}, meta = {}) {
  const {
    data: { id },
  } = payload;
  const { onSuccess = {}, resource, id: metaId } = meta;
  const { snackbar, redirect, closeModal } = onSuccess;

  if (redirect) {
    const { to } = redirect;
    const defaultTo = `/${resource}/${id}`;
    yield put(router.push(to || defaultTo));
  }

  if (snackbar) {
    const defaultProps = {
      message: `${toTitleCase(resource.slice(0, -1))} ${
        metaId ? 'updated' : 'created'
      }`,
    };
    yield put(snackbarController.open({ ...defaultProps, ...snackbar }));
  }

  if (closeModal) {
    const { name } = closeModal;
    yield put(modalController.close(name));
  }
}

function* submit(action) {
  const { meta, payload: data } = action;
  const { resource, id, authorize = true } = meta;

  if (id) {
    yield put(
      crud.update(resource)({ id, data }, { authorize, key: RECORD_FORM })
    );
  } else {
    yield put(crud.create(resource)({ data }, { authorize, key: RECORD_FORM }));
  }

  const crudRace = yield race({
    success: take(crud.isSuccess(RECORD_FORM)),
    failure: take(crud.isFailure(RECORD_FORM)),
  });

  if (crudRace.success) {
    yield put(form.setResponse(RECORD_FORM, crudRace.success.payload));
    yield* success(crudRace.success.payload, meta);
  } else {
    yield put(form.failure(RECORD_FORM, crudRace.failure.error, meta));
  }
}

export function* saga() {
  yield all([takeLatest(form.isSubmit(RECORD_FORM), submit)]);
}
