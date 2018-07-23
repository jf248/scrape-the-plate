import { isPush, isPopOrFlush } from 'lib/redux-queue';

export const isOpen = name => action => isPush(name)(action);
export const isClose = name => action => isPopOrFlush(name)(action);
