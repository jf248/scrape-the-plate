import { makeSimpleRestDataProvider } from 'lib/dataProviders';
import enhancedFetch from './enhancedFetch';

const API_URL = '/api/v1';

export default makeSimpleRestDataProvider(API_URL, enhancedFetch);
