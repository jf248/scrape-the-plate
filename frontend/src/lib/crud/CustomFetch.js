import React from 'react';
import { connect } from 'react-redux';

import { renderProps } from 'lib/react-powerplug';

import { custom } from './actions';

class CustomFetch extends React.Component {
  componentDidMount() {
    const { lazy, goFetch } = this.props;
    !lazy && goFetch();
  }

  componentDidUpdate(prevProps) {
    const propsToCheck = ['path', 'query'];
    if (
      !this.props.lazy &&
      propsToCheck.some(prop => prevProps[prop] !== this.props[prop])
    ) {
      this.props.goFetch();
    }
  }

  render() {
    const { record, goFetch, isLoading } = this.props;
    return renderProps(this.props, {
      record,
      goFetch,
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
  const { path, query, options, authorize, meta } = ownProps;
  return {
    goFetch: data =>
      dispatch(custom({ path, query, options, data }, { authorize, ...meta })),
  };
};

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomFetch);

Connected.defaultProps = {
  lazy: true,
};

export default Connected;
