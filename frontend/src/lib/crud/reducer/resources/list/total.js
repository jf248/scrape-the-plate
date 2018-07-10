import {
  withInitialState,
  withResourceMatch,
  withFetchSuccess,
  compose,
} from '../../utils';
import { GET_ONE, GET_LIST } from '../../../crudTypes';

const totalReducer = (previousState = 0, action) => {
  const { meta = {}, payload } = action;
  const { crudType } = meta;

  if (crudType === GET_ONE) {
    return previousState === 0 ? 1 : previousState;
  }
  if (crudType === GET_LIST) {
    return payload.total || null;
  }
  return previousState;
};

export default resourceName =>
  compose(
    withInitialState(0),
    withResourceMatch(resourceName),
    withFetchSuccess
  )(totalReducer);
