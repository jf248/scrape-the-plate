export const addJsonHeaders = fetchFunc => {
  const next = (url, init = {}) => {
    const headers = init.headers || new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');
    return fetchFunc(url, { ...init, headers });
  };
  return next;
};

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

export const addCsrfToken = getToken => fetchFunc => {
  const next = (url, init = {}) => {
    const headers = init.headers || new Headers();
    headers.set('X-CSRFToken', getToken());
    return fetchFunc(url, { ...init, headers });
  };
  return next;
};

export const logRequest = fetchFunc => {
  const next = (url, init = {}) => {
    console.log('Making request:', url, init); // eslint-disable-line no-console
    return fetchFunc(url, init);
  };
  return next;
};

export const thenCombineResponse = fetchFunc => {
  const next = (url, init) => {
    return fetchFunc(url, init).then(
      response =>
        response.ok ? { response } : { error: { fetchResponse: response } },
      typeError => ({ error: { typeError } })
    );
  };
  return next;
};

export const thenJson = fetchFunc => {
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

export const thenFormatResponse = formatter => fetchFunc => {
  const next = (url, init) => {
    return fetchFunc(url, init).then(response => formatter(response));
  };
  return next;
};

export const thenLogResponse = fetchFunc => {
  const next = (url, init = {}) => {
    return fetchFunc(url, init).then(response => {
      console.log('Response:', response); // eslint-disable-line no-console
      return response;
    });
  };
  return next;
};
