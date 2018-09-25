import React from 'react';

import * as PowerPlug from 'lib/react-powerplug';

import { RoutePush } from 'controllers/route-push';
import {
  AppFrame,
  ComponentOr404,
  ConfirmationModal,
  DrawerContent,
  LoginButton,
  LoginModal,
  Progress,
  Search,
  Snackbar,
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
