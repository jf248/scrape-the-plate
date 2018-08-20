import { formatResponse } from './formatResponse';

describe('formatResponse', () => {
  test('formats response', () => {
    const formatter = jest.fn();
    const fetchFunc = () => Promise.resolve('response');
    const result = formatResponse(formatter)(fetchFunc);
    expect.assertions(2);
    return result('url').then(() => {
      expect(formatter.mock.calls.length).toBe(1);
      expect(formatter.mock.calls[0][0]).toBe('response');
    });
  });
});
