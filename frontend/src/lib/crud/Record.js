import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { renderProps } from 'lib/react-powerplug';

import { getOne, update, destroy } from './actions';

class Record extends React.Component {
  static defaultProps = {
    autoFetch: 'noData',
  };

  static propTypes = {
    autoFetch: PropTypes.oneOf(['never', 'always', 'noData']),
  };

  componentDidMount() {
    const { autoFetch, goFetch, id, record } = this.props;
    if (!id) {
      return;
    }
    if (autoFetch === 'always') {
      goFetch();
      return;
    }
    if (autoFetch === 'noData' && !record) {
      goFetch();
      return;
    }
  }

  componentDidUpdate(prevProps) {
    const { autoFetch, goFetch, id } = this.props;
    const propsToCheck = ['resource', 'id'];
    if (
      autoFetch !== 'never' &&
      id &&
      propsToCheck.some(prop => prevProps[prop] !== this.props[prop])
    ) {
      goFetch();
    }
  }

  render() {
    const { record, goFetch, update, destroy } = this.props;
    return renderProps(this.props, {
      record,
      goFetch,
      update,
      destroy,
    });
  }
}

const mapStateToProps = (state, ownProps) => {
  const { resource: resourceName, id } = ownProps;
  const resource = state.crud.resources[resourceName];

  return {
    record: resource.data[id],
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

export default Connected;
