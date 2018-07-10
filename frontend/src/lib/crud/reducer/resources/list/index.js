import { combineReducers } from 'redux';
import ids from './ids';
import total from './total';
import params from './params';

export default resource =>
  combineReducers({
    ids: ids(resource),
    total: total(resource),
    params: params(resource),
  });
