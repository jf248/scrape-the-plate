export const logResponse = fetchFunc => {
  const next = (url, init = {}) => {
    return fetchFunc(url, init).then(
      response => {
        console.log('Response:', response); // eslint-disable-line no-console
        return response;
      },
      error => {
        console.log('Error:', error); // eslint-disable-line no-console
        return error;
      }
    );
  };
  return next;
};
