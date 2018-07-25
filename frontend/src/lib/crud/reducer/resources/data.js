import {
  withInitialState,
  withResourceMatch,
  withFetchSuccess,
  compose,
} from '../utils';
import { CREATE, DELETE, GET_LIST, GET_ONE, UPDATE } from '../../crudTypes';

const addRecords = (newRecords = [], oldRecords) => {
  const newRecordsById = newRecords.reduce((acc, record) => {
    acc[record.id] = record;
    return acc;
  }, {});

  return { ...oldRecords, ...newRecordsById };
};

const deleteRecords = (idsToDelete, oldRecords) => {
  return Object.keys(oldRecords).reduce((acc, id) => {
    if (!idsToDelete.includes(id)) {
      acc[id] = oldRecords[id];
    }
    return acc;
  }, {});
};

const dataReducer = (prevState = {}, action) => {
  const { payload = {}, meta = {} } = action;
  switch (meta.crudType) {
    case GET_LIST:
      return addRecords(payload.data, prevState);
    case GET_ONE:
    case UPDATE:
    case CREATE:
      return addRecords([payload.data], prevState);
    case DELETE:
      return deleteRecords(payload.data, prevState);
    default:
      return prevState;
  }
};

export default resourceName =>
  compose(
    withInitialState({}),
    withResourceMatch(resourceName),
    withFetchSuccess
  )(dataReducer);
