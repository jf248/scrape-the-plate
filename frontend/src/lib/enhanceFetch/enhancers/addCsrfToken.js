export const addCsrfToken = getToken => fetchFunc => {
  const next = (url, init = {}) => {
    const headers = init.headers || new Headers();
    headers.set('X-CSRFToken', getToken());
    return fetchFunc(url, { ...init, headers });
  };
  return next;
};
