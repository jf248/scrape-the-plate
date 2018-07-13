import React from 'react';
import { connect } from 'react-redux';

import { renderProps } from 'lib/react-powerplug';

import { off } from './actions';

class Is404 extends React.Component {
  componentWillUnmount() {
    this.props.off()
  }


  render() {
    const { is404 } = this.props;
    return renderProps(this.props, { is404 });
  }
}

const mapStateToProps = (state) => {
  return {
    is404: state.is404,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    off: () => dispatch(off()),
  };
};

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Is404);

export default Connected;
