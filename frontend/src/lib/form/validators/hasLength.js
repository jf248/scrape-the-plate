import validateField from './validateField';

const testLength = (string, length) => {
  if (!string) {
    return true;
  }
  return string.length >= length;
};

export default (field, length, error) =>
  validateField(field, testLength, error);
