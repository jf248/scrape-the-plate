import { stringify } from 'qs';

import * as types from './types';

export const restToHttp = apiUrl => fetchFunc => {
  const next = ({ type, resource, params }) => {
    let url = '';
    let options = {};
    switch (type) {
      case types.GET_ONE:
        url = `${apiUrl}/${resource}/${params.id}/`;
        break;
      case types.UPDATE:
        url = `${apiUrl}/${resource}/${params.id}/`;
        options.method = 'PATCH';
        options.body = JSON.stringify(params.data);
        break;
      case types.CREATE:
        url = `${apiUrl}/${resource}/`;
        options.method = 'POST';
        options.body = JSON.stringify(params.data);
        break;
      case types.DELETE:
        url = `${apiUrl}/${resource}/${params.id}/`;
        options.method = 'DELETE';
        break;
      case types.CUSTOM: {
        const { path, query = {}, options: optionsParam, data } = params;
        options = { method: 'GET', ...optionsParam };
        if (data) {
          options.body = JSON.stringify(params.data);
        }
        url = `${apiUrl}/${path}/?${stringify(query)}`;
        break;
      }
      case types.GET_LIST: {
        if (params) {
          const { page, perPage, sort, filter } = params;
          const query = {};
          if (page) {
            query.page = page;
            query.page_size = perPage;
          }
          if (sort) {
            query.ordering = Array.isArray(sort) ? sort.join(',') : sort;
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
      default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
    return fetchFunc(url, options);
  };
  return next;
};
