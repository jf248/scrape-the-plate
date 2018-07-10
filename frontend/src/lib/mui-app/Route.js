import React from 'react';

import { AppFrame } from './Frame';

Route.defaultProps = {
  frameProps: {},
  component: 'div',
};

function Route(props) {
  const { component: Component, title, ...rest } = props;
  return (
    <AppFrame title={title}>
      <Component {...rest} />
    </AppFrame>
  );
}

export default Route;
