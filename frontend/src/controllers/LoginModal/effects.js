import { isPush, isPopOrFlush } from 'lib/redux-queue';

import { NAME } from './names';

export const isOpen = action => isPush(NAME)(action);
export const isClose = action => isPopOrFlush(NAME)(action);
