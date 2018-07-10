import React from 'react';
import { connect } from 'react-redux';

import { renderProps } from 'lib/react-powerplug';

import { getList } from './actions';

class RecordsMany extends React.Component {
  componentDidMount() {
    const { lazy, goFetch, params } = this.props;
    !lazy && goFetch(params);
  }

  componentDidUpdate(prevProps) {
    const { lazy, goFetch, params } = this.props;
    const propsToCheck = ['resource'];
    if (
      !lazy &&
      propsToCheck.some(prop => prevProps[prop] !== this.props[prop])
    ) {
      goFetch(params);
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
    params: resource && resource.list.params,
    isLoading: state.crud.loading > 0,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { resource, key } = ownProps;
  return {
    goFetch: params => dispatch(getList(resource)(params, { key })),
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
