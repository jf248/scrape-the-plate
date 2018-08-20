import Cookies from 'js-cookie';
import * as enhance from 'lib/enhanceFetch';

const getCsrfToken = () => Cookies.get('csrftoken');
const getAuthToken = () => localStorage.getItem('token');

export const enhancedFetch = enhance.compose(
  //enhance.logRequest,
  enhance.addAuthToken(getAuthToken),
  enhance.addCsrfToken(getCsrfToken)
  //enhance.logResponse,
)(fetch);
