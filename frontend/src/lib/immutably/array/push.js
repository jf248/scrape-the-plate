import { wrap } from './wrap';

export const push = (array, newItem) => [...array, ...wrap(newItem)];
