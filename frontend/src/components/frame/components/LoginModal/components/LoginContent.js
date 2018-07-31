import React from 'react';

import { Compose } from 'lib/react-powerplug';
import { isRequired } from 'lib/form';

import { LoginForm } from 'controllers/login-form';
import LoginContentPres from './LoginContentPres';

function LoginContent({ onClose }) {
  const renderFunc = ({ getInputProps, getSubmitProps }) => {
    return <LoginContentPres {...{ getInputProps, getSubmitProps, onClose }} />;
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[
        <LoginForm isLogin validate={isRequired(['username', 'password'])} />,
      ]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default LoginContent;
