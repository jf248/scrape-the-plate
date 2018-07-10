import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { renderProps } from 'lib/react-powerplug';

function WithStore(props) {
  const { children, render, actionCreators, ...rest } = props; // eslint-disable-line no-unused-vars
  return renderProps({ children, render }, rest);
}

export default connect(
  (state, { selector }) => (selector ? selector(state) : {}),
  (dispatch, { actionCreators }) => {
    if (actionCreators) {
      return bindActionCreators(actionCreators, dispatch);
    } else {
      return { dispatch };
    }
  }
)(WithStore);
