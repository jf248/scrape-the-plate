import { SUBMIT } from './actions';

export const isSubmit = name => action => {
  const result = action.type === SUBMIT && action.meta.name === name;
  return result;
};
