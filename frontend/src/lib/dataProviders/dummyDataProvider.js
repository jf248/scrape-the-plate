import { GET_LIST, GET_ONE, CREATE, UPDATE } from './dataFetchActions';

const DUMMY_RESPONSE = {
  id: 36,
  title: 'Changed!',
};

const dummyDataProvider = props => {
  const { variant, params = {} } = props;
  switch (variant) {
    case GET_ONE:
    case GET_LIST:
      return new Promise(resolve => {
        setTimeout(
          resolve(
            new Response(JSON.stringify(DUMMY_RESPONSE), {
              headers: new Headers({ 'Content-Type': 'application/json' }),
            })
          ),
          2000
        );
      });
    case UPDATE:
    case CREATE:
      return new Promise(resolve => {
        setTimeout(
          resolve(
            new Response(JSON.stringify(params.data), {
              headers: new Headers({ 'Content-Type': 'application/json' }),
            })
          ),
          2000
        );
      });
    default:
      return Promise.reject(new Error('Oops, unrecognised request type.'));
  }
};

export default dummyDataProvider;
