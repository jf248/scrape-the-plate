export const REQUEST_AUTHORIZE = 'CRUD/REQUEST_AUTHORIZE';
export const AUTHORIZE_SUCCESS = 'CRUD/AUTHORIZE_SUCCESS';
export const AUTHORIZE_FAILURE = 'CRUD/AUTHORIZE_FAILURE';

export const authorizeSuccess = () => ({
  type: AUTHORIZE_SUCCESS,
});

export const authorizeFailure = () => ({
  type: AUTHORIZE_FAILURE,
});
