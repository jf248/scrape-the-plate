import { combineResponseError } from './combineResponseError';

describe('combineResponseError', () => {
  test('combines response when response ok', () => {
    const fetchFunc = () => Promise.resolve({ ok: true });
    const result = combineResponseError(fetchFunc);
    expect.assertions(1);
    return result('url').then(response =>
      expect(response).toEqual({ response: { ok: true } })
    );
  });

  test('combines response when response not ok', () => {
    const fetchFunc = () => Promise.resolve({ ok: false });
    const result = combineResponseError(fetchFunc);
    expect.assertions(1);
    return result('url').then(response =>
      expect(response).toEqual({ error: { fetchResponse: { ok: false } } })
    );
  });

  test('combines response when Promise rejected', () => {
    const fetchFunc = () => Promise.reject('error');
    const result = combineResponseError(fetchFunc);
    expect.assertions(1);
    return result('url').then(response =>
      expect(response).toEqual({ error: { typeError: 'error' } })
    );
  });
});
