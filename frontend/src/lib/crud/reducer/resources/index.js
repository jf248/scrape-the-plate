import { combineReducers } from 'redux';

import dataReducer from './data';
import listReducer from './list';

export default (initialResources = []) => {
  // initialResources is an array of resource names. Convert it to an object
  // with the names as keys and undefined as each value.
  const initialState = {};
  for (let name of initialResources) {
    initialState[name] = undefined;
  }
  return resources(initialState);
};

const resources = initialState => (prevState = initialState, action) => {
  const names = Object.keys(prevState);
  const reducers = {};

  for (let name of names) {
    reducers[name] = resourceReducer(name);
  }

  return combineReducers(reducers)(prevState, action);
};

const resourceReducer = name =>
  combineReducers({
    data: dataReducer(name),
    list: listReducer(name),
  });
