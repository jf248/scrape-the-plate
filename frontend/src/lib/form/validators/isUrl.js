import validateField from './validateField';

export const testUrl = url => {
  if (!url) {
    return true;
  }
  const re = /^(?:(?:https?):\/\/)(?:www.)?([^:/\s#?]+)\/(?:[^:\s]+)$/;
  return url && re.test(url);
};

export default (field, error = 'Not a valid URL.') =>
  validateField(field, testUrl, error);
