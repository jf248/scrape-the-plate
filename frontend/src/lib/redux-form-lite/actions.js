export const SUBMIT = 'FORM/SUBMIT';
export const SET_SUBMITTING = 'FORM/SET_SUBMITTING';
export const SET_RESPONSE = 'FORM/SET_RESPONSE';
export const SET_ERROR = 'FORM/SET_ERROR';
export const REGISTER = 'FORM/REGISTER';
export const UNREGISTER = 'FORM/UNREGISTER';

export const submit = (name, data, meta) => ({
  type: SUBMIT,
  payload: data,
  meta: { name, ...meta },
});

export const setSubmitting = name => ({
  type: SET_SUBMITTING,
  meta: { name },
});

export const setError = (name, payload) => ({
  type: SET_ERROR,
  payload,
  meta: { name },
});

export const setResponse = (name, payload) => ({
  type: SET_RESPONSE,
  payload,
  meta: { name },
});

export const register = name => ({
  type: REGISTER,
  meta: { name },
});

export const unregister = name => ({
  type: UNREGISTER,
  meta: { name },
});
