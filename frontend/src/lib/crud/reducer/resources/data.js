import {
  compose,
  withType,
  withInitialState,
  withResource,
} from 'lib/crud/utils'; // eslint-disable-line import/no-internal-modules
import { FETCH_SUCCESS } from 'lib/crud/actions'; // eslint-disable-line import/no-internal-modules
import { CREATE, DELETE, GET_LIST, GET_ONE, UPDATE } from 'lib/crud/crudTypes'; // eslint-disable-line import/no-internal-modules

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

export const reducer = resourceName =>
  compose(
    withInitialState({}),
    withResource(resourceName),
    withType(FETCH_SUCCESS)
  )(dataReducer);
