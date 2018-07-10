import {
  REQUEST_AUTHORIZE,
  FETCH,
  FETCH_SUCCESS,
  FETCH_FAILURE,
} from './actions';

export const isRequestAuthorize = action => {
  return action.type === REQUEST_AUTHORIZE;
};

export const isFetch = key => action => {
  return action.type === FETCH && (!key || action.meta.key === key);
};

export const isSuccess = key => action => {
  return action.type === FETCH_SUCCESS && (!key || action.meta.key === key);
};

export const isFailure = key => action => {
  return action.type === FETCH_FAILURE && (!key || action.meta.key === key);
};
