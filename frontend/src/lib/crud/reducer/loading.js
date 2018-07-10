import {
  FETCH_LOADING,
  FETCH_SUCCESS,
  FETCH_FAILURE,
} from '../actions/fetchActions';

export default (previousState = 0, { type }) => {
  switch (type) {
    case FETCH_LOADING:
      return previousState + 1;
    case FETCH_SUCCESS:
    case FETCH_FAILURE:
      return Math.max(previousState - 1, 0);
    default:
      return previousState;
  }
};
