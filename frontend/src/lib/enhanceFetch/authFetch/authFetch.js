import { handleResponse } from './handleResponse';
import { authToHttp } from './authToHttp';
import { compose } from '../compose';
import * as enhancers from '../enhancers';

export const authFetch = urls =>
  compose(
    handleResponse,
    authToHttp(urls),
    enhancers.addJsonHeaders,
    enhancers.combinedResponseToJson,
    enhancers.combineResponseError
  );
