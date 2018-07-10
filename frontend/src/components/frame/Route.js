import React from 'react';

import { AppFrame } from 'lib/mui-app';

import LoginModal from './LoginModal';
import LoginButton from './LoginButton';
import Snackbar from './Snackbar';
import CircularProgress from './CircularProgress';
import { drawer } from 'config';

Route.defaultProps = {
  component: 'div',
};

function Route(props) {
  const { component: Component, title, computedMatch: match, ...rest } = props;

  return (
    <AppFrame
      title={title}
      drawerConfig={drawer}
      ActionsComponent={LoginButton}
      MiddleComponent={CircularProgress}
    >
      <Component match={match} {...rest} />
      <LoginModal />
      <Snackbar />
    </AppFrame>
  );
}

export default Route;
