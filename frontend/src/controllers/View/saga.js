import { all, put, race, takeLatest, take } from 'redux-saga/effects';

import { isSuccess, isFailure, getOne } from 'lib/crud';

import { on as turn404on } from 'controllers/Is404/actions'

import {
  MOUNT,
} from './actions';

import { VIEW } from './names';

function* mount(action) {
  const { meta: { resource, id } } = action;
  yield put(getOne(resource)({id}, { key: VIEW, authorize: false }))
  const crud = yield race({
    success: take(isSuccess(VIEW)),
    failure: take(isFailure(VIEW)),
  });
  if (crud.failure) {
    yield put(turn404on())
  }
}

export default function* watchView() {
  yield all([
    takeLatest(MOUNT, mount),
  ]);
}
