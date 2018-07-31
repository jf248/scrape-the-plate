import { combineReducers } from 'redux';

import * as crud from 'lib/crud';
import * as auth from 'lib/auth';
import * as queue from 'lib/redux-queue';
import * as form from 'lib/redux-form-lite';

import * as is404 from 'controllers/is404';
import { resources } from 'config';

export const reducer = combineReducers({
  crud: crud.reducer(resources),
  auth: auth.reducer,
  queue: queue.reducer,
  form: form.reducer,
  is404: is404.reducer,
});
