import { stringify } from 'qs';

import {
  GET_LIST,
  GET_ONE,
  CREATE,
  UPDATE,
  DELETE,
  CUSTOM,
} from './dataFetchActions';

const accumulator = {};

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const makeSimpleRestDataProvider = (
  apiUrl,
  httpClient = fetch,
  accumulatorWait = 50
) => {
  /**
   * @param {Object} props
   * @param {string} props.type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {string} props.resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} props.params The REST request params, depending on the type
   * @returns {Object} { url, options } The HTTP request parameters
   */
  const convertRESTRequestToHTTP = ({ type, resource, params }) => {
    let url = '';
    let options = {};
    switch (type) {
      case CUSTOM: {
        const { path, query = {}, options: optionsParam, data } = params;
        options = { method: 'GET', ...optionsParam };
        if (data) {
          options.body = JSON.stringify(params.data);
        }
        url = `${apiUrl}/${path}/?${stringify(query)}`;
        break;
      }
      case GET_LIST: {
        if (params) {
          const { page, perPage, sort, order, filter } = params;
          const query = {};
          if (page) {
            query.page = page;
            query.page_size = perPage;
          }
          if (sort) {
            query.ordering = order === 'DESC' ? '-' + sort : sort;
          }
          if (filter) {
            Object.keys(filter).forEach(key => {
              let value = filter[key];
              if (Array.isArray(value)) {
                value = value.join(',');
              }
              query[key] = value;
            });
          }
          url = `${apiUrl}/${resource}/?${stringify(query)}`;
        } else {
          url = `${apiUrl}/${resource}/`;
        }
        break;
      }
      case GET_ONE:
        url = `${apiUrl}/${resource}/${params.id}/`;
        break;
      case UPDATE:
        url = `${apiUrl}/${resource}/${params.id}/`;
        options.method = 'PATCH';
        options.body = JSON.stringify(params.data);
        break;
      case CREATE:
        url = `${apiUrl}/${resource}/`;
        options.method = 'POST';
        options.body = JSON.stringify(params.data);
        break;
      case DELETE:
        url = `${apiUrl}/${resource}/${params.id}/`;
        options.method = 'DELETE';
        break;
      default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
    return { url, options };
  };

  /**
   * @param {Object} props
   * @param {String} props.type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {Object} json
   * @returns {Object} REST response
   */
  const convertHTTPResponseToREST = ({ type }, { response, error }) => {
    if (response) {
      switch (type) {
        case GET_LIST:
          /* Shape of response is { count, next, previous, results } */
          return {
            response: {
              data: response.results,
              total: response.count,
            },
            error,
          };
        default:
          return { response: { data: response }, error };
      }
    } else {
      return { response, error };
    }
  };

  const makeRegularRequest = ({ type, resource, params }) => {
    const { url, options } = convertRESTRequestToHTTP({
      type,
      resource,
      params,
    });
    return httpClient(url, options).then(({ response, error }) =>
      convertHTTPResponseToREST({ type, resource, params }, { response, error })
    );
  };

  /**
   * Accumulate multiple GET_ONE requests of the same resource into
   * one GET_LIST request.
   */
  const makeAccRequest = ({ resource, type, params }) => {
    if (!accumulator[resource]) {
      wait(accumulatorWait)
        .then(() => {
          // Get the set of all ids in the accumulator, converted to an array
          let accIds = [];
          accumulator[resource].forEach(x => {
            accIds.push(x['id']);
          });
          accIds = [...new Set(accIds)];

          // Make the accumulated GET_MANY request
          return makeRegularRequest({
            resource,
            type: GET_LIST,
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

  /**
   * @param {Object} props
   * @param {string} props.type Request type, e.g GET_LIST
   * @param {string} props.resource Resource name, e.g. "posts"
   * @param {Object} props.payload Request parameters. Depends on the request type
   * @returns {Promise} the Promise for a REST response
   */
  const simpleRestDataProvider = ({ type, resource, params }) => {
    if (type === GET_ONE) {
      return makeAccRequest({ type, resource, params });
    } else {
      return makeRegularRequest({ type, resource, params });
    }
  };

  return simpleRestDataProvider;
};

export default makeSimpleRestDataProvider;
