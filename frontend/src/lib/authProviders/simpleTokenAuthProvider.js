import { LOGIN, LOGOUT, SIGNUP, VERIFY } from './authActions';

const defaultHttpClient = (url, init) =>
  fetch(url, init).then(
    response => ({ response: response.json() }),
    error => ({ error })
  );

export default ({ login, signup, verify }, httpClient = defaultHttpClient) => (
  type,
  params
) => {
  const init = {
    method: 'POST',
    body: JSON.stringify(params),
    headers: new Headers({ 'Content-Type': 'application/json' }),
  };

  const handleResponse = ({ response, error }) => {
    if (response) {
      if (!response.token) {
        throw Error('Auth response should contain a token field');
      }
      localStorage.setItem('token', response.token);
    }
    if (error) {
      localStorage.removeItem('token');
    }
    return { response, error };
  };

  switch (type) {
    case VERIFY:
      if (localStorage.getItem('token')) {
        return httpClient(verify, init).then(handleResponse);
      }
      return Promise.resolve({ error: { detail: 'No token' } });
    case LOGIN:
      return httpClient(login, init).then(handleResponse);
    case SIGNUP:
      return httpClient(signup, init).then(handleResponse);
    case LOGOUT:
      localStorage.removeItem('token');
      return Promise.resolve({ response: true });
    default:
      throw new Error('Unknow method in simpleTokenAuthProvider');
  }
};
