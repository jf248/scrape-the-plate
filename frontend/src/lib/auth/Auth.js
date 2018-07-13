import { connect } from 'react-redux';

import { renderProps } from 'lib/react-powerplug';

import { login, logout, signup } from './actions';
import { isLoggedIn, isLoggingIn } from './selectors';

function Auth(props) {
  const { isLoggedIn, isLoggingIn, login, signup, logout } = props;
  return renderProps(props, { isLoggedIn, isLoggingIn, login, signup, logout });
}

const mapStateToProps = state => {
  return {
    isLoggedIn: isLoggedIn(state),
    isLoggingIn: isLoggingIn(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: payload => dispatch(login(payload)),
    signup: payload => dispatch(signup(payload)),
    logout: () => dispatch(logout()),
  };
};

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);

export default Connected;
