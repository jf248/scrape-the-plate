export const validateField = (field, predicate, error) => (
  values,
  errors = {}
) => {
  if (!predicate(values[field])) {
    errors[field] = error;
  }
  return errors;
};
