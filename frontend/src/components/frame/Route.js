import React from 'react';

import { AppFrame } from 'lib/mui-app';

import {
  ConfirmationModal,
  LoginModal,
  LoginButton,
  Snackbar,
  LinearProgress,
  ComponentOr404,
  DrawerContent,
} from './components';
import { LOGIN_MODAL, CONFIRMATION_MODAL } from './names';

Route.defaultProps = {
  component: 'div',
};

function Route(props) {
  const { component, title, computedMatch: match, ...rest } = props;

  return (
    <AppFrame
      title={title}
      drawerContent={<DrawerContent />}
      barProgress={<LinearProgress />}
      barRight={<LoginButton />}
    >
      <ComponentOr404 component={component} match={match} {...rest} />
      <LoginModal name={LOGIN_MODAL} />
      <ConfirmationModal name={CONFIRMATION_MODAL} />
      <Snackbar />
    </AppFrame>
  );
}

export default Route;
