import { remove } from './remove';

describe('remove', () => {
  test('it removes indexed item from array', () => {
    expect(remove([0], 0)).toEqual([]);
  });
});
