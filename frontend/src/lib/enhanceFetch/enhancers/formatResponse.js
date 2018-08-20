export const formatResponse = formatter => fetchFunc => {
  const next = (...args) => {
    return fetchFunc(...args).then(
      response => formatter(response, ...args),
      error => formatter(error, ...args)
    );
  };
  return next;
};
