import { addCsrfToken } from './addCsrfToken';

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
