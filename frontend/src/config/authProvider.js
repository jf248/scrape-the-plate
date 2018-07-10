import { makeSimpleTokenAuthProvider } from 'lib/authProviders';
import enhancedFetch from './enhancedFetch';

const LOGIN_URL = '/api/v1/auth/login/';
const SIGNUP_URL = '/api/v1/auth/signup/';
const VERIFY_URL = '/api/v1/auth/verify/';

export default makeSimpleTokenAuthProvider(
  { login: LOGIN_URL, signup: SIGNUP_URL, verify: VERIFY_URL },
  enhancedFetch
);
