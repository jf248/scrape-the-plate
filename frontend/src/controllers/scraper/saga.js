import { all, put, race, takeLatest, take } from 'redux-saga/effects';
import * as router from 'connected-react-router';

import * as crud from 'lib/crud';
import * as queue from 'lib/redux-queue';

import * as form from 'controllers/form';
import * as snackbarController from 'controllers/snackbar';
import { SKIP, GO_BACK, COPY } from './actions';
import { SCRAPER } from './names';

function* scrape(action) {
  yield put(
    crud.custom(
      { path: 'scrape', query: action.payload },
      { key: SCRAPER, authorize: false }
    )
  );
  const crudRace = yield race({
    success: take(crud.isSuccess(SCRAPER)),
    failure: take(crud.isFailure(SCRAPER)),
  });
  if (crudRace.success) {
    yield put(form.setResponse(SCRAPER, crudRace.success.payload.data));
    yield put(queue.push(SCRAPER));
    yield put(
      snackbarController.open({ message: 'Scraped! Make edits and save.' })
    );
  } else {
    yield put(form.failure(SCRAPER, crudRace.failure.error));
  }
}

function* skip() {
  yield put(form.setResponse(SCRAPER, {}));
  yield put(queue.push(SCRAPER));
}

function* back() {
  yield put(form.setResponse(SCRAPER, {}));
  yield put(queue.pop(SCRAPER));
}

function* copy(action) {
  // Set form response
  const { id, ...rest } = action.payload; // eslint-disable-line no-unused-vars
  yield put(form.setResponse(SCRAPER, rest));

  // Go to Step2
  yield put(queue.flush(SCRAPER));
  yield put(queue.push(SCRAPER));

  // Go to the page
  yield put(router.push(`/recipes/create`));
}

export function* saga() {
  yield all([
    takeLatest(form.isSubmit(SCRAPER), scrape),
    takeLatest(SKIP, skip),
    takeLatest(GO_BACK, back),
    takeLatest(COPY, copy),
  ]);
}
