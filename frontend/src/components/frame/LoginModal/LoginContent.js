import React from 'react';

import { Compose } from 'lib/react-powerplug';
import { isRequired } from 'lib/form/validators';

import LoginForm from 'controllers/LoginForm';
import LoginModal from 'controllers/LoginModal';
import LoginContentPres from './LoginContentPres';
// TODO: remove default
function LoginContent() {
  const renderFunc = ({ getInputProps, getSubmitProps }, { close }) => {
    return <LoginContentPres {...{ getInputProps, getSubmitProps, close }} />;
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[
        <LoginForm initialValues={{username: 'jf248@outlook.com', password: 'password'}} isLogin validate={isRequired(['username', 'password'])} />,
        <LoginModal />,
      ]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default LoginContent;
