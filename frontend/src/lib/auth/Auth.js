import { connect } from 'react-redux';

import { renderProps } from 'lib/react-powerplug';

import { login, logout, signup } from './actions';
import { isLoggedIn, isLoading } from './selectors';

function Auth(props) {
  const { isLoggedIn, isLoading, login, signup, logout } = props;
  return renderProps(props, { isLoggedIn, isLoading, login, signup, logout });
}

const mapStateToProps = state => {
  return {
    isLoggedIn: isLoggedIn(state),
    isLoading: isLoading(state),
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
