import {
  withInitialState,
  withResourceMatch,
  withFetchSuccess,
  compose,
} from '../utils';
import { GET_LIST, GET_ONE, CREATE, UPDATE } from '../../crudTypes';

const addRecords = (newRecords = [], oldRecords) => {
  const newRecordsById = newRecords.reduce(
    (acc, record) => ({
      ...acc,
      [record.id]: record,
    }),
    {}
  );

  return { ...oldRecords, ...newRecordsById };
};

const dataReducer = (prevState = {}, action) => {
  const { payload = {}, meta = {} } = action;
  const { data } = payload;
  switch (meta.crudType) {
    case GET_LIST:
      return addRecords(data, prevState);
    case GET_ONE:
    case UPDATE:
    case CREATE:
      return addRecords([data], prevState);
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
