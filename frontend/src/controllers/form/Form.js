import React from 'react';

import { Compose, renderProps } from 'lib/react-powerplug';
import { Form as BasicForm } from 'lib/form';
import { FormController as ReduxFormLite } from 'lib/redux-form-lite';

Form.defaultProps = {
  onSubmit: (values, submit) => submit(values),
};

function Form(props) {
  const { name, onSubmit, ...rest } = props;

  const renderFunc = (reduxForm, basicForm) => {
    const { isSubmitting, submit, response } = reduxForm;
    return renderProps(props, { ...basicForm, isSubmitting, submit, response });
  };

  const handleSubmit = submit => (values, { isValid, setTouchedAll }) => {
    if (!isValid) {
      return setTouchedAll();
    }
    onSubmit(values, submit);
  };

  const makeBasicForm = (render, { submit, error }) => {
    return (
      <BasicForm
        onSubmit={handleSubmit(submit)}
        apiErrors={error}
        {...rest}
        render={render}
      />
    );
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[<ReduxFormLite name={name} />, makeBasicForm]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default Form;
