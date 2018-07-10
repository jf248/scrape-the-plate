import React from 'react';
import { connect } from 'react-redux';

import { renderProps } from 'lib/react-powerplug';

import { getOne, update, destroy } from './actions';

class Record extends React.Component {
  componentDidMount() {
    const { lazy, goFetch } = this.props;
    !lazy && goFetch();
  }

  componentDidUpdate(prevProps) {
    const propsToCheck = ['resource', 'id'];
    if (
      !this.props.lazy &&
      propsToCheck.some(prop => prevProps[prop] !== this.props[prop])
    ) {
      this.props.goFetch();
    }
  }

  render() {
    const { record, goFetch, update, destroy, isLoading } = this.props;
    return renderProps(this.props, {
      record,
      goFetch,
      update,
      destroy,
      isLoading,
    });
  }
}

const mapStateToProps = (state, ownProps) => {
  const { resource: resourceName, id } = ownProps;
  const resource = state.crud.resources[resourceName];

  return {
    record: resource.data[id],
    isLoading: state.crud.loading > 0,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { resource, id, key } = ownProps;
  return {
    goFetch: () => dispatch(getOne(resource)({ id }, { key })),
    update: (data, previousData) =>
      dispatch(update(resource)({ id, data, previousData }, { key })),
    destroy: previousData =>
      dispatch(destroy(resource)({ id, previousData }, { key })),
  };
};

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Record);

Connected.defaultProps = {
  lazy: false,
};

export default Connected;
