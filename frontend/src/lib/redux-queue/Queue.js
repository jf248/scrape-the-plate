import React from 'react';
import { connect } from 'react-redux';

import { renderProps } from 'lib/react-powerplug';

import { pop, push, flush } from './actions';

class Queue extends React.Component {
  componentWillUnmount() {
    const { provider, flush } = this.props;
    provider && flush();
  }

  render() {
    const { pop, push, flush, queue = [] } = this.props;
    const isEmpty = queue.length === 0;
    const hasItems = !isEmpty;
    return renderProps(this.props, {
      pop,
      push,
      flush,
      queue,
      isEmpty,
      hasItems,
    });
  }
}

const mapStateToProps = (state, ownProps) => {
  const queue = state.queue[ownProps.name];
  return {
    queue,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { name = 'queue' } = ownProps;
  return {
    push: payload => dispatch(push(name, payload)),
    pop: () => dispatch(pop(name)),
    flush: () => dispatch(flush(name)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Queue);
