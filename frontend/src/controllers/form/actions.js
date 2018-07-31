export { setError, setResponse, isSubmit } from 'lib/redux-form-lite';

export const FAILURE = 'APP/FORM/FAILURE';

export const failure = (name, error, meta) => ({
  type: FAILURE,
  error,
  meta: {
    name,
    ...meta,
  },
});
