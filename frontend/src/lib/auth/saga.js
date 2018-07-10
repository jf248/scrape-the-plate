import { put, call, takeEvery } from 'redux-saga/effects';

import { FETCH, FETCH_LOADING, FETCH_FAILURE, FETCH_SUCCESS } from './actions';

function* handleFetch(authProvider, action) {
  const {
    payload,
    meta: { authType },
  } = action;
  yield put({ type: FETCH_LOADING });
  const { response, error } = yield call(authProvider, authType, payload);
  yield put({
    type: response ? FETCH_SUCCESS : FETCH_FAILURE,
    payload: response,
    error,
    meta: {
      authType,
    },
  });
}

export default authProvider => {
  if (!authProvider) return () => null;
  return function* watchFetch() {
    yield takeEvery(FETCH, handleFetch, authProvider);
  };
};
