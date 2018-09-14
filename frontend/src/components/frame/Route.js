import React from 'react';

import * as PowerPlug from 'lib/react-powerplug';
import { AppFrame } from 'lib/mui-app';

import { RoutePush } from 'controllers/route-push';
import {
  ConfirmationModal,
  LoginModal,
  LoginButton,
  Snackbar,
  Progress,
  ComponentOr404,
  DrawerContent,
  Search,
} from './components';
import { LOGIN_MODAL, CONFIRMATION_MODAL } from './names';

Route.defaultProps = {
  component: 'div',
};

const SEARCH_PATH = '/search/:query';
function Route(props) {
  const {
    component,
    title,
    computedMatch: match,
    path,
    location,
    exact,
    ...rest
  } = props;

  const query = path === SEARCH_PATH ? match.params.query : '';
  const variant = path === SEARCH_PATH ? 'back' : 'default';
  const { url } = match;

  const renderFunc = ({ push }) => {
    const onGoBack = () => push('/recipes');

    return (
      <AppFrame
        onGoBack={onGoBack}
        variant={variant}
        title={title}
        drawerContent={<DrawerContent path={path} url={url} />}
        barProgress={<Progress />}
        barRight={<LoginButton />}
        barLeft={<Search query={query} />}
      >
        <ComponentOr404
          component={component}
          match={match}
          path={path}
          {...rest}
        />
        <LoginModal name={LOGIN_MODAL} />
        <ConfirmationModal name={CONFIRMATION_MODAL} />
        <Snackbar />
      </AppFrame>
    );
  };

  return (
    /* eslint-disable react/jsx-key */
    <PowerPlug.Compose components={[<RoutePush />]} render={renderFunc} />
    /* eslint-enable react/jsx-key */
  );
}

export default Route;
