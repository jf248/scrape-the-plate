import { GET_ONE, GET_LIST, DELETE } from 'lib/crud/crudTypes'; // eslint-disable-line import/no-internal-modules

export const reducer = (prevState, action) => {
  const { meta = {}, payload } = action;
  switch (meta.crudType) {
    case GET_ONE:
      return prevState === 0 ? 1 : prevState;
    case GET_LIST:
      return payload.total || null;
    case DELETE:
      return prevState - payload.data.length;
    default:
      return prevState;
  }
};
