import { formatApiError } from './formatApiError';

describe('formatApiError', () => {
  it('returns a string', () => {
    expect(formatApiError('foo')).toEqual('foo');
  });
  it('stringifies objects', () => {
    expect(formatApiError({ foo: 'bar' })).toEqual('{"foo":"bar"}');
  });
});
