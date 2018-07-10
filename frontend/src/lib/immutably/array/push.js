import wrap from './wrap';

const push = (array, newItem) => [...array, ...wrap(newItem)];

export default push;
