import {
  withInitialState,
  withResourceMatch,
  withFetchSuccess,
  compose,
} from '../../utils';
import { GET_LIST, GET_ONE, CREATE, UPDATE } from '../../../crudTypes';

const addRecordIds = (newRecordIds = [], oldRecordIds) => {
  let recordIds = [...oldRecordIds, ...newRecordIds];
  recordIds = [...new Set(recordIds)];
  return recordIds;
};

const idsReducer = (prevState = [], action) => {
  const { meta, payload } = action;
  switch (meta.crudType) {
    case GET_LIST:
      return addRecordIds(payload.data.map(({ id }) => id), []);
    case GET_ONE:
    case CREATE:
    case UPDATE:
      return addRecordIds([payload.data.id], prevState);
    default:
      return prevState;
  }
};

export default resourceName =>
  compose(
    withInitialState([]),
    withResourceMatch(resourceName),
    withFetchSuccess
  )(idsReducer);
