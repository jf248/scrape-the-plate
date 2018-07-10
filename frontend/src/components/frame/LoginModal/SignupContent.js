import React from 'react';

import { Compose } from 'lib/react-powerplug';
import {
  compose,
  isEmail,
  isRequired,
  areEqual,
  hasLength,
} from 'lib/form/validators';

import LoginModal from 'controllers/LoginModal';
import LoginForm from 'controllers/LoginForm';
import SignupContentPres from './SignupContentPres';

const validate = compose(
  areEqual('password', 'retypePassword', 'Passwords do no match.'),
  hasLength('password', 8, 'Password must be at least 8 characters long.'),
  isEmail('username'),
  isRequired(['first_name', 'last_name', 'password', 'username'])
);

function SignupContent() {
  const renderFunc = (form, loginControl) => {
    const { getInputProps, getSubmitProps } = form;
    const { close } = loginControl;
    return <SignupContentPres {...{ getInputProps, getSubmitProps, close }} />;
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[
        <LoginForm isLogin={false} validate={validate} />,
        <LoginModal />,
      ]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default SignupContent;
