import { toTitleCase } from '.';

describe('toTitleCase', () => {
  it('capitalises all words except small words', () => {
    expect(toTitleCase('title of book')).toBe('Title of Book');
    expect(toTitleCase('TITLE of bOok')).toBe('Title of Book');
  });
});
