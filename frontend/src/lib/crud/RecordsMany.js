import React from 'react';
import { connect } from 'react-redux';

import { renderProps } from 'lib/react-powerplug';

import { getList } from './actions';
import { deepEqual } from './utils';

class RecordsMany extends React.Component {
  componentDidMount() {
    const { lazy, goFetch, initialParams, params } = this.props;
    !lazy && goFetch({ ...params, ...initialParams });
  }

  componentDidUpdate(prevProps) {
    const { lazy, goFetch, initialParams, params } = this.props;
    const propsToCheck = ['resource', 'initialParams'];
    if (
      !lazy &&
      propsToCheck.some(prop => !deepEqual(prevProps[prop], this.props[prop]))
    ) {
      goFetch({ ...params, ...initialParams });
    }
  }

  render() {
    const {
      ids,
      data,
      total,
      params: paramsProp,
      goFetch,
      isLoading,
    } = this.props;
    return renderProps(this.props, {
      data,
      goFetch: params => goFetch({ ...paramsProp, ...params }),
      ids,
      isLoading,
      params: paramsProp,
      total,
    });
  }
}

const mapStateToProps = (state, ownProps) => {
  const resource = state.crud.resources[ownProps.resource];

  return {
    ids: resource && resource.list.ids,
    total: resource && resource.list.total,
    data: resource && resource.data,
    params: { ...(resource && resource.list.params) },
    isLoading: state.crud.loading > 0,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { resource, authorize, meta } = ownProps;
  return {
    goFetch: params =>
      dispatch(getList(resource)(params, { authorize, ...meta })),
  };
};

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordsMany);

Connected.defaultProps = {
  lazy: false,
};

export default Connected;
