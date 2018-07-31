import { compose } from './compose';

describe('composes validators, mutably and immutably', () => {
  const result = compose(
    (v, e) => {
      e.first = 'foo';
    },
    (v, e) => ({ ...e, second: 'bar' }),
    () => {
      return;
    }
  )();
  test('composes', () => {
    expect(result).toEqual({ first: 'foo', second: 'bar' });
  });
});
