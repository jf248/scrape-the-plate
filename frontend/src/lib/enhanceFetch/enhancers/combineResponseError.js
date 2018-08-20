export const combineResponseError = fetchFunc => {
  const next = (url, init) => {
    return fetchFunc(url, init).then(
      response => {
        return response.ok
          ? { response }
          : { error: { fetchResponse: response } };
      },
      typeError => ({ error: { typeError } })
    );
  };
  return next;
};
