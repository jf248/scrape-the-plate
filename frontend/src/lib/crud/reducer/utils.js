import { FETCH_SUCCESS } from '../actions';

export const withInitialState = initialState => reducer => {
  const next = (prevState = initialState, action) => {
    return reducer(prevState, action);
  };
  return next;
};

export const withResourceMatch = resourceName => reducer => {
  const next = (prevState, action) => {
    if (action.meta && action.meta.resource === resourceName) {
      return reducer(prevState, action);
    }
    return prevState;
  };
  return next;
};

export const withFetchSuccess = reducer => {
  const next = (prevState, action) => {
    if (action.type === FETCH_SUCCESS) {
      return reducer(prevState, action);
    }
    return prevState;
  };
  return next;
};

export const compose = (...enhancers) => fetchFunc => {
  enhancers = enhancers.slice();
  enhancers = enhancers.reverse();
  return enhancers.reduce((acc, enhancer) => enhancer(acc), fetchFunc);
};
