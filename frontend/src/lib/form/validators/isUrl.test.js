import { testUrl } from './isUrl';

describe('testUrl', () => {
  test('returns true for valid; false for invalid', () => {
    expect(testUrl('http://valid.com/asd')).toBe(true);

    expect(testUrl('valid.com/asd')).toBe(false);
    expect(testUrl('http://valid.com/')).toBe(false);
  });
});
