import React from 'react';
import { push } from 'connected-react-router';

import { Compose, renderProps } from 'lib/react-powerplug';
import { WithStore } from 'lib/with-store';

function RoutePush(props) {
  const renderFunc = ({ push, location: { pathname: path } }) => {
    return renderProps(props, { push, path });
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[
        <WithStore
          selector={state => state.router}
          actionCreators={{ push }}
        />,
      ]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default RoutePush;
