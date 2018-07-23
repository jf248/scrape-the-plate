import React from 'react';

import { AppFrame } from './Frame';

Route.defaultProps = {
  frameProps: {},
  component: 'div',
};

function Route(props) {
  const { component: Component, title, computedMatch, ...rest } = props; // eslint-disable-line no-unused-vars
  // computedMatch prop is inserted by the parent component, react-router's
  // Switch
  return (
    <AppFrame title={title}>
      <Component {...rest} />
    </AppFrame>
  );
}

export default Route;
