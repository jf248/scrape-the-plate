import React from 'react';

import { AppFrame } from 'lib/mui-app';

import {
  ConfirmationModal,
  LoginModal,
  LoginButton,
  Snackbar,
  CircularProgress,
  ComponentOr404,
} from './components';
import { LOGIN_MODAL, CONFIRMATION_MODAL } from './names';

Route.defaultProps = {
  component: 'div',
};

function Route(props) {
  const { component, title, computedMatch: match, drawer, ...rest } = props;

  return (
    <AppFrame
      title={title}
      drawerConfig={drawer}
      ActionsComponent={LoginButton}
      MiddleComponent={CircularProgress}
    >
      <ComponentOr404 component={component} match={match} {...rest} />
      <LoginModal name={LOGIN_MODAL} />
      <ConfirmationModal name={CONFIRMATION_MODAL} />
      <Snackbar />
    </AppFrame>
  );
}

export default Route;
