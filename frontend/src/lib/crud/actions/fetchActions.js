import {
  GET_LIST,
  GET_ONE,
  CREATE,
  UPDATE,
  DELETE,
  CUSTOM,
} from '../crudTypes';

export const FETCH = 'CRUD/FETCH';
export const FETCH_LOADING = 'CRUD/FETCH_LOADING';
export const FETCH_SUCCESS = 'CRUD/FETCH_SUCCESS';
export const FETCH_FAILURE = 'CRUD/FETCH_FAILURE';

const makeAction = crudType => resource => (payload, meta) => {
  return {
    type: FETCH,
    payload,
    meta: {
      ...meta,
      crudType,
      resource,
    },
  };
};

/**
 * Usage: getList('recipes')({sort, order, page, perPage, filter}, { authorize })
 */
export const getList = makeAction(GET_LIST);

/**
 * @param {object} Args object of type { resource, id, authorize }
 */
export const getOne = makeAction(GET_ONE);

/**
 * @param {object} Args object of type { resource, data, authorize }
 */
export const create = makeAction(CREATE);

/**
 * @param {object} Args object of type { resource, id, data, previousData,
 * authorize }
 */
export const update = makeAction(UPDATE);

/**
 * @param {object} Args object of type { reosurce, id, previousData, authorize }
 */
export const destroy = makeAction(DELETE);

/**
 * Args object of type { path, query, options, data }
 */
export const custom = (payload, meta) => ({
  type: FETCH,
  payload,
  meta: {
    ...meta,
    crudType: CUSTOM,
  },
});
