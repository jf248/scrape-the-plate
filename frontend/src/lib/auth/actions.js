import { LOGIN, LOGOUT, VERIFY, SIGNUP } from './types';

export const FETCH = 'AUTH/FETCH';
export const FETCH_LOADING = 'AUTH/FETCH_LOADING';
export const FETCH_SUCCESS = 'AUTH/FETCH_SUCCESS';
export const FETCH_FAILURE = 'AUTH/FETCH_FAILURE';

const makeFetchAction = authType => payload => {
  return {
    type: FETCH,
    payload,
    meta: {
      authType,
    },
  };
};

export const login = makeFetchAction(LOGIN);

export const signup = makeFetchAction(SIGNUP);

export const verify = makeFetchAction(VERIFY);

export const logout = makeFetchAction(LOGOUT);
