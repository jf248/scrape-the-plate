import { CREATE, DELETE, GET_LIST, GET_ONE, UPDATE } from 'lib/crud/crudTypes'; // eslint-disable-line import/no-internal-modules

const addRecordIds = (newRecordIds = [], oldRecordIds) => {
  let recordIds = [...oldRecordIds, ...newRecordIds];
  recordIds = [...new Set(recordIds)];
  return recordIds;
};

const deleteRecordIds = (idsToDelete = [], oldIds) => {
  return oldIds.filter(id => !idsToDelete.includes(id));
};

export const reducer = (prevState, action) => {
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
