import { all, put, race, takeLatest, take } from 'redux-saga/effects';

import { isSuccess, isFailure, custom } from 'lib/crud';
import { push, pop } from 'lib/redux-queue';

import {
  isSubmit as isFormSubmit,
  setResponse as setFormResponse,
  failure as formFailure,
} from 'controllers/Form/actions';
import {
  SKIP,
  GO_BACK,
  success as scraperSuccess,
  failure as scraperFailure,
} from './actions';
import { SCRAPER } from './names';

function* scrape(action) {
  yield put(
    custom(
      { path: 'scrape', query: action.payload },
      { key: SCRAPER, authorize: false }
    )
  );
  const crud = yield race({
    success: take(isSuccess(SCRAPER)),
    failure: take(isFailure(SCRAPER)),
  });
  if (crud.success) {
    yield put(setFormResponse(SCRAPER, crud.success.payload.data));
    yield put(push(SCRAPER));
    yield put(scraperSuccess(crud.success.payload));
  } else {
    yield put(formFailure(SCRAPER, crud.failure.error));
    yield put(scraperFailure(crud.failure.error));
  }
}

function* skip() {
  yield put(setFormResponse(SCRAPER, {}));
  yield put(push(SCRAPER));
}

function* back() {
  yield put(setFormResponse(SCRAPER, {}));
  yield put(pop(SCRAPER));
}

export default function* watchScrape() {
  yield all([
    takeLatest(isFormSubmit(SCRAPER), scrape),
    takeLatest(SKIP, skip),
    takeLatest(GO_BACK, back),
  ]);
}
