import { ON, OFF } from './actions';

export default (state = false, action) => {
  const { type } = action;
  switch (type) {
    case ON:
      return true;
    case OFF:
      return false;
    default:
      return state;
  }
};
