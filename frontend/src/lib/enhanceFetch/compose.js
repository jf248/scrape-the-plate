const compose = (...enhancers) => fetchFunc => {
  return enhancers.reduce((acc, enhancer) => enhancer(acc), fetchFunc);
};

export default compose;
