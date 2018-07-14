import React from 'react';
import { connect } from 'react-redux';

import { Compose, renderProps } from 'lib/react-powerplug';
import { Record } from 'lib/crud';

import { mount } from './actions';

class View extends React.Component {
  componentDidMount() {
    const { dispatch, resource, id } = this.props;
    dispatch(mount(resource, id));
  }

  render() {
    const { resource, id } = this.props;
    const renderFunc = ({ record }) => {
      return renderProps(this.props, { record });
    };

    return (
      /* eslint-disable react/jsx-key */
      <Compose
        components={[
          <Record lazy resource={resource} id={id} render={renderFunc} />,
        ]}
        render={renderFunc}
      />
      /* eslint-enable react/jsx-key */
    );
  }
}

export default connect()(View);
