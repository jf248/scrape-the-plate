import { validateField } from './validateField';

const testEmail = email => {
  if (!email) {
    return true;
  }
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const isEmail = (field, error = 'Not a valid email address') =>
  validateField(field, testEmail, error);
