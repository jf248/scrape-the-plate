import React from 'react';

import { Compose, State } from 'lib/react-powerplug';

import LoginModalPres from './LoginModalPres';
import LoginModalController from 'controllers/LoginModal';

function LoginModal() {
  const renderFunc = (loginControl, tabs) => {
    const { isOpen, login, signup, close: closeModal } = loginControl;
    const {
      state: { tabsValue },
      setState,
    } = tabs;

    const onTabChange = (event, value) => {
      setState({ tabsValue: value });
    };

    return (
      <LoginModalPres
        {...{ isOpen, closeModal, login, signup, tabsValue, onTabChange }}
      />
    );
  };

  /* eslint-disable react/jsx-key */
  return (
    <Compose
      components={[
        <LoginModalController provider />,
        <State initial={{ tabsValue: 0 }} />,
      ]}
      render={renderFunc}
    />
  );
  /* eslint-enable react/jsx-key */
}

export default LoginModal;
