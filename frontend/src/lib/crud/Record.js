import React from 'react';
import { connect } from 'react-redux';

import { renderProps } from 'lib/react-powerplug';

import { getOne, update, destroy } from './actions';

class Record extends React.Component {
  componentDidMount() {
    const { lazy, goFetch, id, resource } = this.props;
    !lazy && id && resource && goFetch();
  }

  componentDidUpdate(prevProps) {
    const { lazy, resource, goFetch, id } = this.props;
    const propsToCheck = ['resource', 'id'];
    if (
      !lazy &&
      id &&
      resource &&
      propsToCheck.some(prop => prevProps[prop] !== this.props[prop])
    ) {
      goFetch();
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
  const { resource, id, authorize, meta } = ownProps;
  return {
    goFetch: () => dispatch(getOne(resource)({ id }, { authorize, ...meta })),
    update: (data, previousData) =>
      dispatch(
        update(resource)({ id, data, previousData }, { authorize, ...meta })
      ),
    destroy: previousData =>
      dispatch(destroy(resource)({ id, previousData }, { authorize, ...meta })),
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
