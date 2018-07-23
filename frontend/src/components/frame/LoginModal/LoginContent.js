import React from 'react';

import { Compose } from 'lib/react-powerplug';
import { isRequired } from 'lib/form/validators';

import LoginForm from 'controllers/LoginForm';
import Modal from 'controllers/Modal';
import { LOGIN_MODAL } from 'names';
import LoginContentPres from './LoginContentPres';

function LoginContent() {
  const renderFunc = ({ getInputProps, getSubmitProps }, { onClose }) => {
    return <LoginContentPres {...{ getInputProps, getSubmitProps, onClose }} />;
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[
        <LoginForm isLogin validate={isRequired(['username', 'password'])} />,
        <Modal name={LOGIN_MODAL} />,
      ]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default LoginContent;
