import { combineReducers } from 'redux';

import { RESET_STORE } from 'lib/crud/actions'; // eslint-disable-line import/no-internal-modules
import { reducer as resourcesReducer } from './resources';
import { reducer as loadingReducer } from './loading';

const appReducer = initialResources =>
  combineReducers({
    resources: resourcesReducer(initialResources),
    loading: loadingReducer,
  });

export const reducer = initialResources => {
  return (state, action) => {
    if (action.type === RESET_STORE) {
      state = undefined;
    }
    return appReducer(initialResources)(state, action);
  };
};
