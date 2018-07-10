import {
  SUBMIT,
  SET_RESPONSE,
  SET_ERROR,
  SET_SUBMITTING,
  REGISTER,
  UNREGISTER,
} from './actions';

const form = (prevState = {}, action) => {
  switch (action.type) {
    case SUBMIT:
      return {
        submittedData: action.payload,
        isSubmitting: false,
        error: null,
        response: null,
      };
    case SET_SUBMITTING:
      return { ...prevState, isSubmitting: true, error: null, response: null };
    case SET_RESPONSE:
      return {
        ...prevState,
        isSubmitting: false,
        error: null,
        response: action.payload,
      };
    case SET_ERROR:
      return {
        ...prevState,
        isSubmitting: false,
        error: action.payload,
        response: null,
      };
    default:
      return prevState;
  }
};

export default (prevState = {}, action) => {
  switch (action.type) {
    case REGISTER:
      return { ...prevState, [action.meta.name]: {} };
    case UNREGISTER:
      return { ...prevState, [action.meta.name]: null };
    case SUBMIT:
    case SET_SUBMITTING:
    case SET_RESPONSE:
    case SET_ERROR:
      return { ...prevState, [action.meta.name]: form(prevState.form, action) };
    default:
      return prevState;
  }
};
