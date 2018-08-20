export const addAuthToken = (getToken, keyword = 'Token') => fetchFunc => {
  const next = (url, init = {}) => {
    const headers = init.headers || new Headers();
    const token = getToken();
    if (token) {
      headers.set('Authorization', `${keyword} ${getToken()}`);
    }
    return fetchFunc(url, { ...init, headers });
  };
  return next;
};
