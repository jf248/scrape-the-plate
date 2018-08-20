import { throttle } from './throttle';

describe('throttle', () => {
  test('only calls fetch once if fetch still pending', async () => {
    const fetchFunc = jest.fn(() => Promise.resolve('foo'));
    const throttledFetch = throttle(fetchFunc);

    // Call for the first time
    throttledFetch('url');
    // Immediately call again
    await throttledFetch('url');

    expect(fetchFunc.mock.calls.length).toEqual(1);
  });

  test('calls twice if first fetch has already resolved', async () => {
    const fetchFunc = jest.fn(() => Promise.resolve('foo'));
    const throttledFetch = throttle(fetchFunc);
    // Call and wait for the first time
    await throttledFetch('url');
    // Then call again
    await throttledFetch('url');

    expect(fetchFunc.mock.calls.length).toEqual(2);
  });
  test('returns correctly', async () => {
    const fetchFunc = jest.fn(() => Promise.resolve('foo'));
    const throttledFetch = throttle(fetchFunc);
    expect(await throttledFetch('url')).toEqual('foo');
  });
});
