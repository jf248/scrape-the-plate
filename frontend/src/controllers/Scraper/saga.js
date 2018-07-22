import { all, put, race, takeLatest, take } from 'redux-saga/effects';
import { push as pushRoute } from 'connected-react-router';

import { isSuccess, isFailure, custom } from 'lib/crud';
import { push, pop, flush } from 'lib/redux-queue';

import {
  isSubmit as isFormSubmit,
  setResponse as setFormResponse,
  failure as formFailure,
} from 'controllers/Form/actions';
import { open as openSnackbar } from 'controllers/Snackbar/actions';
import { SKIP, GO_BACK, COPY } from './actions';
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
    yield put(openSnackbar({ message: 'Scraped! Make edits and save.' }));
  } else {
    yield put(formFailure(SCRAPER, crud.failure.error));
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

function* copy(action) {
  console.log('copy', action);
  // Set form response
  const { id, ...rest } = action.payload; // eslint-disable-line no-unused-vars
  yield put(setFormResponse(SCRAPER, rest));

  // Go to Step2
  yield put(flush(SCRAPER));
  yield put(push(SCRAPER));

  // Go to the page
  yield put(pushRoute(`/recipes/create`));
}

export default function* watchScrape() {
  yield all([
    takeLatest(isFormSubmit(SCRAPER), scrape),
    takeLatest(SKIP, skip),
    takeLatest(GO_BACK, back),
    takeLatest(COPY, copy),
  ]);
}
