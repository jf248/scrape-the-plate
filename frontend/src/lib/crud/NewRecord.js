import React from 'react';
import { connect } from 'react-redux';

import { renderProps } from 'lib/react-powerplug';

import { create } from './actions';

class NewRecord extends React.Component {
  render() {
    const { create, isLoading } = this.props;
    return renderProps(this.props, {
      create,
      isLoading,
    });
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.crud.loading > 0,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { resource, key } = ownProps;
  return {
    create: data => dispatch(create(resource)({ data }, { key })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewRecord);
