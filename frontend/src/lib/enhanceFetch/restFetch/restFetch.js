import { responseFormatter } from './responseFormatter';
import { restToHttp } from './restToHttp';
import { accumulate } from './accumulate';
import { compose } from '../compose';
import * as enhancers from '../enhancers';

export const restFetch = apiUrl =>
  compose(
    enhancers.throttle,
    accumulate(),
    enhancers.formatResponse(responseFormatter),
    restToHttp(apiUrl),
    enhancers.addJsonHeaders,
    enhancers.combinedResponseToJson,
    enhancers.combineResponseError
  );
