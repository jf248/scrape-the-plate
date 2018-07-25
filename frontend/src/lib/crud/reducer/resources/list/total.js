import {
  withInitialState,
  withResourceMatch,
  withFetchSuccess,
  compose,
} from '../../utils';
import { GET_ONE, GET_LIST, DELETE } from '../../../crudTypes';

const totalReducer = (state = 0, action) => {
  const { meta = {}, payload } = action;
  switch (meta.crudType) {
    case GET_ONE:
      return state === 0 ? 1 : state;
    case GET_LIST:
      return payload.total || null;
    case DELETE:
      return state - payload.data.length;
    default:
      return state;
  }
};

export default resourceName =>
  compose(
    withInitialState(0),
    withResourceMatch(resourceName),
    withFetchSuccess
  )(totalReducer);
