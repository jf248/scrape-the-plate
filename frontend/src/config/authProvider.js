import * as enhance from 'lib/enhanceFetch';

import { enhancedFetch } from './enhancedFetch';

const URLS = {
  login: '/api/v1/auth/login/',
  signup: '/api/v1/auth/login/',
  verify: '/api/v1/auth/login/',
};

export const authProvider = enhance.authFetch(URLS)(enhancedFetch);
