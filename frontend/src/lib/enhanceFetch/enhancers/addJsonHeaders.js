export const addJsonHeaders = fetchFunc => {
  const next = (url, init = {}) => {
    const headers = init.headers || new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');
    return fetchFunc(url, { ...init, headers });
  };
  return next;
};
