import * as types from './types';

export const responseFormatter = ({ response, error }, { type, params }) => {
  if (response) {
    switch (type) {
      case types.GET_LIST:
        /* Shape of response is { count, next, previous, results } */
        return {
          response: {
            data: response.results,
            total: response.count,
          },
          error,
        };
      case types.DELETE:
        return { response: { data: [params.id] }, error };
      default:
        return { response: { data: response }, error };
    }
  } else if (error && error.json && error.fetchResponse.status === 400) {
    const { non_field_errors, ...fieldErrors } = error.json;
    return {
      error: {
        ...error,
        nonFieldErrors: non_field_errors,
        fieldErrors,
      },
    };
  } else {
    return { response, error };
  }
};
