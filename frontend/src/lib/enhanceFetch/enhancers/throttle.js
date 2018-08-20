// The first time a distinct request is made it is executed and the promise
// stored. Any subsequent requests with the same parameters made while the Promise is pending won't fetch
// but will just wait for the original Promise to resolve.

const store = {};

export const throttle = fetchFunc => {
  const next = (...args) => {
    let prehash = JSON.stringify(...args);
    if (!store.hasOwnProperty(prehash)) {
      fetchFunc(...args)
        .then(
          response => store[prehash].resolve.forEach(fn => fn(response)),
          error => store[prehash].reject.forEach(fn => fn(error))
        )
        .then(() => {
          delete store[prehash];
        });
      store[prehash] = { resolve: [], reject: [] };
    }
    return new Promise((resolve, reject) => {
      store[prehash].resolve.push(resolve);
      store[prehash].reject.push(reject);
    });
  };
  return next;
};
