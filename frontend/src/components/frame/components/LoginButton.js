import React from 'react';

import { Compose } from 'lib/react-powerplug';
import { Auth } from 'lib/auth';

import { Modal } from 'controllers/modal';
import { LOGIN_MODAL } from 'components/frame';
import LoginButtonPres from './LoginButtonPres';

function LoginButton() {
  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[<Auth />, <Modal name={LOGIN_MODAL} />]}
      render={(auth, login) => {
        const { isLoggedIn, logout } = auth;
        const { onOpen: onOpenModal } = login;
        const handleClick = () => {
          if (isLoggedIn) {
            return logout();
          }
          return onOpenModal();
        };
        return <LoginButtonPres {...{ isLoggedIn, onClick: handleClick }} />;
      }}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default LoginButton;
