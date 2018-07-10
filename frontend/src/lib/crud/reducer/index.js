import { combineReducers } from 'redux';

import resources from './resources';
import loading from './loading';

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

export default initialResources =>
  combineReducers({
    resources: resources(initialResources),
    loading,
  });
