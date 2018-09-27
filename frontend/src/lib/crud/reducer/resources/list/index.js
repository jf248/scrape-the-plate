import { combineReducers } from 'redux';

import {
  compose,
  withType,
  withInitialState,
  withResource,
} from 'lib/crud/utils'; // eslint-disable-line import/no-internal-modules
import { FETCH_SUCCESS } from 'lib/crud/actions'; // eslint-disable-line import/no-internal-modules
import { reducer as idsReducer } from './ids';
import { reducer as totalReducer } from './total';
import { reducer as paramsReducer } from './params';

const composed = (reducer, initialState, resourceName) =>
  compose(
    withInitialState(initialState),
    withResource(resourceName),
    withType(FETCH_SUCCESS)
  )(reducer);

export const reducer = resourceName =>
  combineReducers({
    ids: composed(idsReducer, [], resourceName),
    total: composed(totalReducer, 0, resourceName),
    params: composed(paramsReducer, {}, resourceName),
  });
