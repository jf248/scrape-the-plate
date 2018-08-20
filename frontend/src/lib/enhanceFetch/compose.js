export const compose = (...enhancers) => fetchFunc => {
  return enhancers.reduceRight((acc, enhancer) => enhancer(acc), fetchFunc);
};
