import 'whatwg-fetch';

import { restFetch } from './restFetch';

const json = { results: [{ foo: 'foo' }], count: 1 };
const blob = new Blob([JSON.stringify(json, null, 2)], {
  type: 'application/json',
});
const fakeFetch = (url, init) =>
  new Promise(resolve => resolve(new Response(blob)));

describe('restFetch', () => {
  it('works with GET_LIST', async () => {
    const result = await restFetch('url')(fakeFetch)({
      type: 'GET_LIST',
      resource: 'recipes',
    });
    expect(result.response).toEqual({ data: [{ foo: 'foo' }], total: 1 });
  });
});
