import { PUSH, POP, FLUSH } from './actions';

export const isPush = name => action => {
  return action.type === PUSH && action.meta.name === name;
};

export const isPopOrFlush = name => action => {
  const actionTypes = [POP, FLUSH];
  return actionTypes.includes(action.type) && action.meta.name === name;
};
