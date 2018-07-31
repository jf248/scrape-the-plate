export const compose = (...enhancers) => fetchFunc => {
  return enhancers.reduce((acc, enhancer) => enhancer(acc), fetchFunc);
};
