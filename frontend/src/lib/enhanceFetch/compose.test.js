import { compose } from './compose';

describe('compose', () => {
  test('calls enhancers in reverse', () => {
    const enhancer1 = jest.fn();
    const enhanced1 = jest.fn();
    enhancer1.mockReturnValue(enhanced1);

    const enhancer2 = jest.fn();
    const enhanced2 = jest.fn();
    enhancer2.mockReturnValue(enhanced2);

    const fetchFunc = jest.fn();

    const result = compose(
      enhancer1,
      enhancer2
    )(fetchFunc);

    expect(enhancer1.mock.calls.length).toBe(1);
    expect(enhancer2.mock.calls.length).toBe(1);
    expect(enhancer1.mock.calls[0][0]).toBe(enhanced2);
    expect(result).toBe(enhanced1);
  });

  test('returns fetchFunc if no enhnacers given', () => {
    const fetchFunc = jest.fn();
    expect(compose()(fetchFunc)).toBe(fetchFunc);
  });
});
