import { combineReducers } from 'redux';

import * as data from './data';
import * as list from './list';

const resourceReducer = resourceName =>
  combineReducers({
    data: data.reducer(resourceName),
    list: list.reducer(resourceName),
  });

const resourcesReducer = initialState => (prevState = initialState, action) => {
  const names = Object.keys(prevState);
  const reducers = {};

  for (let name of names) {
    reducers[name] = resourceReducer(name);
  }

  return combineReducers(reducers)(prevState, action);
};

export const reducer = (initialResources = []) => {
  // initialResources is an array of resource names. Convert it to an object
  // with the names as keys and undefined as each value.
  const initialState = {};
  for (let name of initialResources) {
    initialState[name] = undefined;
  }
  return resourcesReducer(initialState);
};
