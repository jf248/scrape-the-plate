import { isEmpty } from './isEmpty';
// We expect the apiError to be a string, but if an object is given, need to
// stringify
export function formatApiError(error) {
  if (typeof error === 'string') {
    return error;
  }
  if (isEmpty(error)) {
    return '';
  }
  return JSON.stringify(error);
}
