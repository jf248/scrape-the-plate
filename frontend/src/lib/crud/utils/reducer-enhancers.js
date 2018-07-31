export const withInitialState = initialState => reducer => {
  const next = (prevState = initialState, action) => {
    return reducer(prevState, action);
  };
  return next;
};

export const actionSelector = selector => reducer => {
  const next = (prevState, action) => {
    if (selector(action)) {
      return reducer(prevState, action);
    }
    return prevState;
  };
  return next;
};

export const withResource = resourceName =>
  actionSelector(
    action => action.meta && action.meta.resource === resourceName
  );

export const withType = type => actionSelector(action => action.type === type);

export const compose = (...enhancers) => fetchFunc => {
  enhancers = enhancers.slice();
  enhancers = enhancers.reverse();
  return enhancers.reduce((acc, enhancer) => enhancer(acc), fetchFunc);
};
