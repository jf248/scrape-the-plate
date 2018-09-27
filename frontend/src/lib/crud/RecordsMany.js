import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { renderProps } from 'lib/react-powerplug';

import { getList } from './actions';
import { deepEqual } from './utils';

class RecordsMany extends React.Component {
  static defaultProps = {
    autoFetch: 'always',
  };

  static propTypes = {
    autoFetch: PropTypes.oneOf(['never', 'always']),
  };

  componentDidMount() {
    const { autoFetch, goFetch, initialParams } = this.props;
    if (autoFetch === 'always') {
      goFetch(initialParams);
    }
  }

  componentDidUpdate(prevProps) {
    const { autoFetch, goFetch, initialParams } = this.props;
    const propsToCheck = ['resource', 'initialParams'];
    if (
      autoFetch === 'always' &&
      propsToCheck.some(prop => !deepEqual(prevProps[prop], this.props[prop]))
    ) {
      goFetch(initialParams);
    }
  }

  render() {
    const { ids, total, params, goFetch, data } = this.props;
    return renderProps(this.props, {
      goFetch,
      ids,
      data,
      params,
      total,
    });
  }
}

const mapStateToProps = (state, ownProps) => {
  const resource = state.crud.resources[ownProps.resource];

  return {
    ids: resource.list.ids,
    total: resource.list.total,
    params: resource.list.params,
    data: resource.data,
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

export default Connected;
