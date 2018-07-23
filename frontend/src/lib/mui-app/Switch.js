import React from 'react';
import {} from '@material-ui/core';
import { Switch as RouterSwitch } from 'react-router-dom';

import Route from './Route';

Switch.defaultProps = {
  RouteComponent: Route,
  routes: [],
};

function Switch(props) {
  const { routes, RouteComponent, ...rest } = props;
  return (
    <RouterSwitch>
      {routes.map((route, index) => (
        <RouteComponent key={index} {...route} {...rest} />
      ))}
    </RouterSwitch>
  );
}

export default Switch;
