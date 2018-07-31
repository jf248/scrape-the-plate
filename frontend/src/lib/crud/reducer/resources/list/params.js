import { GET_LIST } from 'lib/crud/crudTypes'; // eslint-disable-line import/no-internal-modules

export const reducer = (prevState, action) => {
  const { meta = {} } = action;
  const { crudType, requestParams = {} } = meta;
  if (crudType === GET_LIST) {
    return requestParams;
  }
  return prevState;
};
