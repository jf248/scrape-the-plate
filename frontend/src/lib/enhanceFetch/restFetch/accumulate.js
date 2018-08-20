import * as types from './types';

const accumulator = {};

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

// A restFetch enchancer.
// Picks off types.GET_ONE request to accumulate into a single GET_LIST request.
export const accumulate = (waitLength = 50) => restFetchFunc => {
  const next = ({ type, resource, params }) => {
    if (type !== types.GET_ONE) {
      return restFetchFunc({ type, resource, params });
    }

    if (!accumulator[resource]) {
      wait(waitLength)
        .then(() => {
          // Get the set of all ids in the accumulator, converted to an array
          let accIds = [];
          accumulator[resource].forEach(x => {
            accIds.push(x['id']);
          });
          accIds = [...new Set(accIds)];

          // Make the accumulated GET_MANY request
          return restFetchFunc({
            resource,
            type: types.GET_LIST,
            params: { filter: { id: accIds } },
          });
        })
        .then(({ response, error }) => {
          if (response) {
            const accData = response.data;
            accumulator[resource].forEach(({ id, resolve }) => {
              let data = accData.find(x => x['id'] === id);
              if (data) {
                resolve({ response: { data } });
              } else {
                resolve({
                  error: {
                    response: new Response(null, {
                      status: 404,
                      statusText: 'Not found (Grouped in a GET_LIST)',
                    }),
                  },
                });
              }
            });
          } else {
            accumulator[resource].forEach(({ resolve }) => {
              error.message = error.message + ' (Accumulated GET_LIST request)';
              resolve({ error });
            });
          }
        })
        .then(() => {
          // Finally delete the accumulator for that resource
          delete accumulator[resource];
        });
      // Create a new accumulator for that resource
      accumulator[resource] = [];
    }

    // Return a Promise whose resolve callback is stored for later
    // in the accumulator.
    return new Promise(resolve =>
      accumulator[resource].push({ id: parseInt(params.id, 10), type, resolve })
    );
  };
  return next;
};
