const promiseAction = (props, action, dispatch, onSuccess, onFailure) =>
  new Promise((resolve, reject) => {
    dispatch(action({ ...props, resolve, reject }));
  }).then((responseError = {}) => {
    const { response, error } = responseError;
    response && onSuccess && onSuccess(response);
    error && onFailure && onFailure(error);
    return responseError;
  });

export default promiseAction;
