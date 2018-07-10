import resourcesReducer from './index';

jest.mock('./data', () => jest.fn(() => (x = true) => x));
jest.mock('./list', () => jest.fn(() => (x = true) => x));

describe('resources reducer', () => {
  test('it loads initial state', () => {
    expect(resourcesReducer(['foo', 'bar'])(undefined, {})).toEqual({
      foo: { data: true, list: true },
      bar: { data: true, list: true },
    });
  });
});
