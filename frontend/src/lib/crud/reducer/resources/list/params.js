import {
  withInitialState,
  withResourceMatch,
  withFetchSuccess,
  compose,
} from '../../utils';
import { GET_LIST } from '../../../crudTypes';

const initialState = {
  sort: null,
  order: null,
  page: 1,
  perPage: 12,
  filter: {},
};

const paramsReducer = (prevState = initialState, action) => {
  const { meta = {} } = action;
  const { crudType, requestParams = {} } = meta;
  if (crudType === GET_LIST) {
    return requestParams;
  }
  return prevState;
};

export default resourceName =>
  compose(
    withInitialState(initialState),
    withResourceMatch(resourceName),
    withFetchSuccess
  )(paramsReducer);
