import { call, put, takeEvery, take, race } from 'redux-saga/effects';

import {
  FETCH,
  FETCH_LOADING,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  REQUEST_AUTHORIZE,
  AUTHORIZE_FAILURE,
  AUTHORIZE_SUCCESS,
} from './actions';

function* checkAuthorization() {
  yield put({
    type: REQUEST_AUTHORIZE,
  });
  const { success } = yield race({
    success: take(AUTHORIZE_SUCCESS),
    failure: take(AUTHORIZE_FAILURE),
  });
  return success ? true : false;
}

function* handleFetch(dataProvider, action) {
  const { payload, meta } = action;
  const { crudType, resource, authorize } = meta;

  if (authorize) {
    const authorized = yield checkAuthorization();
    if (!authorized) {
      return;
    }
  }

  yield put({ type: FETCH_LOADING });
  const { response, error } = yield call(dataProvider, {
    type: crudType,
    resource: resource,
    params: payload,
  });

  if (response) {
    if (!response.data) {
      throw new Error('REST response must contain a data key');
    }
    yield put({
      type: FETCH_SUCCESS,
      payload: response,
      meta: { ...meta, requestParams: payload },
    });
  } else {
    yield put({
      type: FETCH_FAILURE,
      error,
      meta: { ...meta, requestParams: payload },
    });
  }
}

export function* saga(dataProvider) {
  yield takeEvery(FETCH, handleFetch, dataProvider);
}
