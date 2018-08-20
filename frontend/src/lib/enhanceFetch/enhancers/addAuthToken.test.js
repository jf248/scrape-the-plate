import { addAuthToken } from './addAuthToken';

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
