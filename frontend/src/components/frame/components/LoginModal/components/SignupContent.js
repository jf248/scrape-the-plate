import React from 'react';

import { Compose } from 'lib/react-powerplug';
import { compose, isEmail, isRequired, areEqual, hasLength } from 'lib/form';

import { LoginForm } from 'controllers/login-form';
import SignupContentPres from './SignupContentPres';

const validate = compose(
  areEqual('password', 'retypePassword', 'Passwords do no match.'),
  hasLength('password', 8, 'Password must be at least 8 characters long.'),
  isEmail('username'),
  isRequired(['first_name', 'last_name', 'password', 'username'])
);

function SignupContent({ onClose }) {
  const renderFunc = (form, modal) => {
    const { getInputProps, getSubmitProps } = form;
    return (
      <SignupContentPres {...{ getInputProps, getSubmitProps, onClose }} />
    );
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[<LoginForm isLogin={false} validate={validate} />]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default SignupContent;
