import React from 'react';

import { Compose } from 'lib/react-powerplug';
import { Auth } from 'lib/auth';

import LoginModal from 'controllers/LoginModal';
import LoginButtonPres from './LoginButtonPres';

function LoginButton() {
  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[<Auth />, <LoginModal />]}
      render={(auth, login) => {
        const { isLoggedIn, logout } = auth;
        const { open: openModal } = login;
        return <LoginButtonPres {...{ isLoggedIn, openModal, logout }} />;
      }}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default LoginButton;
