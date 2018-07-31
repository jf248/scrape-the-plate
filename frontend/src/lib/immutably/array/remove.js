export const remove = (array, index) => [
  ...array.slice(0, index),
  ...array.slice(index + 1),
];
