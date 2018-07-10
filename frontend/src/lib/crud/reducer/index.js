import { combineReducers } from 'redux';

import resources from './resources';
import loading from './loading';
import { RESET_STORE } from '../actions';

/**
 * State shape:
 *
 * state = {
 *  loading: number
 *  resources: {
 *    [name]: {
 *      data: {
 *        [id]: {}
 *        ...
 *      }
 *      list: {
 *        ids: [ ... ]
 *        total: number
 *      }
 *    }
 *  }
 * }
 */

const appReducer = initialResources =>
  combineReducers({
    resources: resources(initialResources),
    loading,
  });

export default initialResources => {
  return (state, action) => {
    if (action.type === RESET_STORE) {
      state = undefined;
    }
    return appReducer(initialResources)(state, action);
  };
};
