import { wrap } from './wrap';

export const replace = (array, index, newItem) => [
  ...array.slice(0, index),
  ...wrap(newItem),
  ...array.slice(index + 1),
];
