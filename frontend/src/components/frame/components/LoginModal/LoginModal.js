import React from 'react';

import { Compose, State } from 'lib/react-powerplug';

import { Modal } from 'controllers/modal';
import LoginModalPres from './LoginModalPres';

function LoginModal({ name }) {
  const renderFunc = (loginControl, tabs) => {
    const { isOpen, onClose } = loginControl;
    const {
      state: { tabsValue },
      setState,
    } = tabs;

    const onTabChange = (event, value) => {
      setState({ tabsValue: value });
    };

    return <LoginModalPres {...{ isOpen, onClose, tabsValue, onTabChange }} />;
  };

  /* eslint-disable react/jsx-key */
  return (
    <Compose
      components={[
        <Modal provider name={name} />,
        <State initial={{ tabsValue: 0 }} />,
      ]}
      render={renderFunc}
    />
  );
  /* eslint-enable react/jsx-key */
}

export default LoginModal;
