import { reducer } from './index';
import * as data from './data';
import * as list from './list';

jest.mock('./data');
jest.mock('./list');

describe('resources reducer', () => {
  test('it loads initial state', () => {
    const mockReducer = resourceName => (prevState = true) => true;
    data.reducer.mockImplementation(mockReducer);
    list.reducer.mockImplementation(mockReducer);
    expect(reducer(['foo', 'bar'])(undefined, {})).toEqual({
      foo: { data: true, list: true },
      bar: { data: true, list: true },
    });
  });
});
