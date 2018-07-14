import Cookies from 'js-cookie';
import {
  compose,
  addJsonHeaders,
  addAuthToken,
  addCsrfToken,
  thenCombineResponse,
  thenJson,
  thenFormatResponse,
  logRequest, // eslint-disable-line no-unused-vars
  thenLogResponse, // eslint-disable-line no-unused-vars
} from 'lib/enhanceFetch';

const getCsrfToken = () => Cookies.get('csrftoken');
const getAuthToken = () => localStorage.getItem('token');

const formatResponse = ({ response, error }) => {
  if (response) {
    return { response };
  }
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
  return { response, error };
};

/**
 * To add logs for development:
 *
 * const enhancedFetch = compose(
 *   addJsonHeaders,
 *   addAuthToken(getAuthToken),
 *   addCsrfToken(getCsrfToken),
 *   logRequest,
 *   thenCombineResponse,
 *   thenJson,
 *   thenFormatResponse(formatResponse),
 *   thenLogResponse,
 * )(fetch);
 */

const enhancedFetch = compose(
  addJsonHeaders,
  addAuthToken(getAuthToken),
  addCsrfToken(getCsrfToken),
  thenCombineResponse,
  thenJson,
  thenFormatResponse(formatResponse)
)(fetch);

export default enhancedFetch;
