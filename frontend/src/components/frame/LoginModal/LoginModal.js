import React from 'react';

import { Compose, State } from 'lib/react-powerplug';

import Modal from 'controllers/Modal';
import { LOGIN_MODAL } from 'names';
import LoginModalPres from './LoginModalPres';

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
        <Modal provider name={LOGIN_MODAL} />,
        <State initial={{ tabsValue: 0 }} />,
      ]}
      render={renderFunc}
    />
  );
  /* eslint-enable react/jsx-key */
}

export default LoginModal;
