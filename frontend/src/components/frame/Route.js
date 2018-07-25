import React from 'react';

import { AppFrame } from 'lib/mui-app';

import { drawer } from 'config';
import ConfirmationModal from './ConfirmationModal';
import LoginModal from './LoginModal';
import LoginButton from './LoginButton';
import Snackbar from './Snackbar';
import CircularProgress from './CircularProgress';
import ComponentOr404 from './ComponentOr404';

Route.defaultProps = {
  component: 'div',
};

function Route(props) {
  const { component, title, computedMatch: match, ...rest } = props;

  return (
    <AppFrame
      title={title}
      drawerConfig={drawer}
      ActionsComponent={LoginButton}
      MiddleComponent={CircularProgress}
    >
      <ComponentOr404 component={component} match={match} {...rest} />
      <LoginModal />
      <ConfirmationModal />
      <Snackbar />
    </AppFrame>
  );
}

export default Route;
