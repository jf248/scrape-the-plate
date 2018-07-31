import { pop, push } from 'lib/redux-queue';

export const open = (name, payload = {}) => push(name, payload);
export const close = name => pop(name);
