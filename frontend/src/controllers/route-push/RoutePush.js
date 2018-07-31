import React from 'react';
import { push } from 'connected-react-router';

import { Compose, renderProps } from 'lib/react-powerplug';
import { WithStore } from 'lib/with-store';

function RoutePush(props) {
  const renderFunc = ({ push }) => {
    return renderProps(props, { push });
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[<WithStore actionCreators={{ push }} />]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default RoutePush;
