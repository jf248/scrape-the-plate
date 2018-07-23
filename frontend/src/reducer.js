import { combineReducers } from 'redux';

import { reducer as crudReducer } from 'lib/crud';
import { reducer as authReducer } from 'lib/auth';
import { reducer as queueReducer } from 'lib/redux-queue';
import { reducer as formReducer } from 'lib/redux-form-lite';

import is404Reducer from 'controllers/Is404/reducer';
import resources from 'config/resources';

const rootReducer = combineReducers({
  crud: crudReducer(resources),
  auth: authReducer,
  queue: queueReducer,
  form: formReducer,
  is404: is404Reducer,
});

export default rootReducer;
