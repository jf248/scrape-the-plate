export const areEqual = (field1, field2, error) => (values, errors = {}) => {
  if (values[field1] !== values[field2]) {
    errors[field1] = error;
  }
  return errors;
};
