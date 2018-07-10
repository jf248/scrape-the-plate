export default (field, predicate, error) => (values, errors = {}) => {
  if (!predicate(values[field])) {
    errors[field] = error;
  }
  return errors;
};
