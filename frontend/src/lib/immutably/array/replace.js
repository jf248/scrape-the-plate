import wrap from './wrap';

const replace = (array, index, newItem) => [
  ...array.slice(0, index),
  ...wrap(newItem),
  ...array.slice(index + 1),
];

export default replace;
