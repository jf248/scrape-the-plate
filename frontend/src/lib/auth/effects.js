import { LOGIN, VERIFY, SIGNUP, LOGOUT } from './types';
import { FETCH_SUCCESS, FETCH_FAILURE } from './actions';

const authTypes = [LOGIN, VERIFY, SIGNUP];

export const isLoginSuccess = action => {
  return (
    action.type === FETCH_SUCCESS && authTypes.includes(action.meta.authType)
  );
};

export const isLogoutSuccess = action => {
  return action.type === FETCH_SUCCESS && action.meta.authType === LOGOUT;
};

export const isLoginFailure = action => {
  return (
    action.type === FETCH_FAILURE && authTypes.includes(action.meta.authType)
  );
};
