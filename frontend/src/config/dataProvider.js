import * as enhance from 'lib/enhanceFetch';

import { enhancedFetch } from './enhancedFetch';

const API_URL = '/api/v1';

export const dataProvider = enhance.restFetch(API_URL)(enhancedFetch);
