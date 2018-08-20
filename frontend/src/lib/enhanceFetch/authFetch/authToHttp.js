import * as types from './types';

export const authToHttp = urls => fetchFunc => {
  const { login, signup, verify } = urls;
  const next = (type, params) => {
    const init = {
      method: 'POST',
      body: JSON.stringify(params),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    };
    switch (type) {
      case types.VERIFY:
        if (localStorage.getItem('token')) {
          return fetchFunc(verify, init);
        }
        return Promise.resolve({ error: { detail: 'No token' } });
      case types.LOGIN:
        return fetchFunc(login, init);
      case types.SIGNUP:
        return fetchFunc(signup, init);
      case types.LOGOUT:
        localStorage.removeItem('token');
        return Promise.resolve({ response: true });
      default:
        throw new Error('Unknow method in simpleTokenAuthProvider');
    }
  };
  return next;
};
