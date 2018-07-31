import { validateField } from './validateField';

const testLength = length => string => {
  if (!string) {
    return true;
  }
  return string.length >= length;
};

export const hasLength = (field, length, error) =>
  validateField(field, testLength(length), error);
