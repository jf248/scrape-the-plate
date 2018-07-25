import {
  compose,
  withFetchSuccess,
  withInitialState,
  withResourceMatch,
} from '../../utils';
import { CREATE, DELETE, GET_LIST, GET_ONE, UPDATE } from '../../../crudTypes';

const addRecordIds = (newRecordIds = [], oldRecordIds) => {
  let recordIds = [...oldRecordIds, ...newRecordIds];
  recordIds = [...new Set(recordIds)];
  return recordIds;
};

const deleteRecordIds = (idsToDelete = [], oldIds) => {
  return oldIds.filter(id => !idsToDelete.includes(id));
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
    case DELETE:
      return deleteRecordIds(payload.data, prevState);
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
