import React from 'react';

import { renderProps } from 'lib/react-powerplug';

import Form from 'controllers/Form';
import { LOGIN, SIGNUP } from './names';

LoginForm.defaultProps = {};

function LoginForm(props) {
  const { initialValues, validate, normalize, isLogin } = props;

  const renderFunc = formProps => {
    const { getInputProps, getSubmitProps } = formProps;
    return renderProps(props, {
      getInputProps,
      getSubmitProps,
    });
  };

  const handleSubmit = (values, submit) => submit(values, { isLogin });

  return (
    <Form
      onSubmit={handleSubmit}
      name={isLogin ? LOGIN : SIGNUP}
      initialValues={initialValues}
      validate={validate}
      normalize={normalize}
      render={renderFunc}
    />
  );
}

export default LoginForm;
