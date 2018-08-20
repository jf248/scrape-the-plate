import 'whatwg-fetch';
import { combinedResponseToJson } from './combinedResponseToJson';

describe('combinedResponseToJson', () => {
  const json = { hello: 'world' };

  test('adds json to response', () => {
    const blob = new Blob([JSON.stringify(json, null, 2)], {
      type: 'application/json',
    });
    const mockResponse = { response: new Response(blob) };
    const fetchFunc = () => Promise.resolve(mockResponse);
    const result = combinedResponseToJson(fetchFunc);
    expect.assertions(1);
    return result('url').then(response =>
      expect(response).toEqual({ response: json })
    );
  });

  test('adds json to error', () => {
    const blob = new Blob([JSON.stringify(json, null, 2)], {
      type: 'application/json',
    });
    const fetchResponse = new Response(blob);
    const fetchFunc = () => Promise.resolve({ error: { fetchResponse } });
    const result = combinedResponseToJson(fetchFunc);
    expect.assertions(1);
    return result('url').then(response =>
      expect(response).toEqual({ error: { fetchResponse, json } })
    );
  });
});
