import { POP, PUSH, FLUSH } from './actions';

const push = (prevState, action) => {
  const {
    meta: { name },
    payload = {},
  } = action;

  const prevQueue = prevState[name] || [];
  const newQueue = prevQueue.concat(payload);
  return { ...prevState, [name]: newQueue };
};

const pop = (prevState, action) => {
  const {
    meta: { name },
  } = action;

  const prevQueue = prevState[name] || [];
  const newQueue = prevQueue.slice(1);
  return { ...prevState, [name]: newQueue };
};

const flush = (prevState, action) => {
  const {
    meta: { name },
  } = action;

  return { ...prevState, [name]: [] };
};

export const reducer = (prevState = {}, action) => {
  switch (action.type) {
    case PUSH:
      return push(prevState, action);
    case POP:
      return pop(prevState, action);
    case FLUSH:
      return flush(prevState, action);
    default:
      return prevState;
  }
};
