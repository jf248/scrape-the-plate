import { FETCH_LOADING, FETCH_SUCCESS, FETCH_FAILURE } from './actions';
import { LOGOUT } from './types';

const initialState = { isLoggingIn: false, isLoggedIn: false, user: {} };

export const reducer = (previousState = initialState, action) => {
  const { type, payload, meta } = action;
  switch (type) {
    case FETCH_LOADING:
      return { isLoggingIn: true, isLoggedIn: false, user: {} };
    case FETCH_SUCCESS: {
      const isLoggedIn = meta.authType === LOGOUT ? false : true;
      return {
        ...previousState,
        isLoggingIn: false,
        isLoggedIn,
        user: payload,
      };
    }
    case FETCH_FAILURE:
      return initialState;
    default:
      return previousState;
  }
};
