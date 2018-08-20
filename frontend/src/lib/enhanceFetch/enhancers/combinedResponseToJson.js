export const combinedResponseToJson = fetchFunc => {
  const next = (url, init) => {
    return fetchFunc(url, init).then(({ response, error }) => {
      if (response) {
        return response
          .json()
          .then(json => ({ response: json }), () => ({ response }));
      }
      if (error && error.fetchResponse) {
        return error.fetchResponse
          .json()
          .then(json => ({ error: { ...error, json } }), () => ({ error }));
      } else {
        return { response, error };
      }
    });
  };
  return next;
};
