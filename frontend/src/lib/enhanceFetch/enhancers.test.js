import 'whatwg-fetch';
import {
  addJsonHeaders,
  addAuthToken,
  addCsrfToken,
  thenCombineResponse,
  thenJson,
  thenFormatResponse,
} from './enhancers';

describe('addJsonHeaders', () => {
  test('adds JSON headers', () => {
    const fetchFunc = jest.fn();
    const result = addJsonHeaders(fetchFunc);
    result('url');
    expect(fetchFunc.mock.calls.length).toBe(1);
    expect(fetchFunc.mock.calls[0][1].headers.map).toEqual({
      accept: 'application/json',
      'content-type': 'application/json',
    });
  });
});

describe('addAuthToken', () => {
  test('adds Auth token', () => {
    const fetchFunc = jest.fn();
    const result = addAuthToken(() => 'token')(fetchFunc);
    result('url');
    expect(fetchFunc.mock.calls.length).toBe(1);
    expect(fetchFunc.mock.calls[0][1].headers.map).toEqual({
      authorization: 'Token token',
    });
  });
});

describe('addCsrfToken', () => {
  test('adds CSRF token', () => {
    const fetchFunc = jest.fn();
    const result = addCsrfToken(() => 'token')(fetchFunc);
    result('url');
    expect(fetchFunc.mock.calls.length).toBe(1);
    expect(fetchFunc.mock.calls[0][1].headers.map).toEqual({
      'x-csrftoken': 'token',
    });
  });
});

describe('thenCombineResponse', () => {
  test('combines response when response ok', () => {
    const fetchFunc = () => Promise.resolve({ ok: true });
    const result = thenCombineResponse(fetchFunc);
    expect.assertions(1);
    return result('url').then(response =>
      expect(response).toEqual({ response: { ok: true } })
    );
  });

  test('combines response when response not ok', () => {
    const fetchFunc = () => Promise.resolve({ ok: false });
    const result = thenCombineResponse(fetchFunc);
    expect.assertions(1);
    return result('url').then(response =>
      expect(response).toEqual({ error: { fetchResponse: { ok: false } } })
    );
  });

  test('combines response when Promise rejected', () => {
    const fetchFunc = () => Promise.reject('error');
    const result = thenCombineResponse(fetchFunc);
    expect.assertions(1);
    return result('url').then(response =>
      expect(response).toEqual({ error: { typeError: 'error' } })
    );
  });
});

describe('thenJson', () => {
  const json = { hello: 'world' };

  test('adds json to response', () => {
    const blob = new Blob([JSON.stringify(json, null, 2)], {
      type: 'application/json',
    });
    const mockResponse = { response: new Response(blob) };
    const fetchFunc = () => Promise.resolve(mockResponse);
    const result = thenJson(fetchFunc);
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
    const result = thenJson(fetchFunc);
    expect.assertions(1);
    return result('url').then(response =>
      expect(response).toEqual({ error: { fetchResponse, json } })
    );
  });
});

describe('thenFormatResponse', () => {
  test('formats response', () => {
    const formatter = jest.fn();
    const fetchFunc = () => Promise.resolve('response');
    const result = thenFormatResponse(formatter)(fetchFunc);
    expect.assertions(2);
    return result('url').then(() => {
      expect(formatter.mock.calls.length).toBe(1);
      expect(formatter.mock.calls[0][0]).toBe('response');
    });
  });
});
