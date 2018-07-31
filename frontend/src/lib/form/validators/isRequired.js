export const isRequired = (fields, error = 'Required.') => (
  values,
  errors = {}
) => {
  fields.forEach(field => {
    if (!values[field]) {
      errors[field] = error;
    }
  });
  return errors;
};
