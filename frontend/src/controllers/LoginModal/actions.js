import { pop, push } from 'lib/redux-queue';

import { NAME } from './names';

export const open = (payload = {}) => push(NAME, payload);
export const close = () => pop(NAME);
