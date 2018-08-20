import { addJsonHeaders } from './addJsonHeaders';

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
