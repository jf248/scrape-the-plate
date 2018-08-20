import * as types from './types';

export const handleResponse = fetchFunc => {
  const next = (type, ...args) =>
    fetchFunc(type, ...args).then(({ response, error }) => {
      if (response) {
        if (type !== types.LOGOUT && !response.token) {
          throw Error('Auth response should contain a token field');
        }
        localStorage.setItem('token', response.token);
      }

      if (error) {
        localStorage.removeItem('token');
        if (error.json && error.fetchResponse.status === 400) {
          const { non_field_errors, ...fieldErrors } = error.json;
          return {
            error: {
              ...error,
              nonFieldErrors: non_field_errors,
              fieldErrors,
            },
          };
        }
      }
      return { response, error };
    });
  return next;
};
