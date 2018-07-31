export const compose = (...validators) => (values, errors = {}) => {
  return validators.reduce(
    (accErrors, validator) => validator(values, accErrors) || accErrors,
    errors
  );
};
