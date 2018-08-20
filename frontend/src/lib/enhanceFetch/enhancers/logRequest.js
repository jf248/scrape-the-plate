export const logRequest = fetchFunc => {
  const next = (url, init = {}) => {
    console.log('Making request:', url, init); // eslint-disable-line no-console
    return fetchFunc(url, init);
  };
  return next;
};
