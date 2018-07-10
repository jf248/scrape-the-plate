import { all, put, race, takeLatest, take } from 'redux-saga/effects';

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

import { success } from './actions';

import { RECORD_FORM } from './names';

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
    yield put(success(crud.success.payload, meta));
  } else {
    yield put(formFailure(RECORD_FORM, crud.failure.error, meta));
  }
}

export default function* watchSubmit() {
  yield all([takeLatest(isFormSubmit(RECORD_FORM), submit)]);
}
