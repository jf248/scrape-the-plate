import React from 'react';

import { Compose, renderProps } from 'lib/react-powerplug';
import { Record } from 'lib/crud';

import Form from 'controllers/Form';
import { RECORD_FORM } from './names';

RecordForm.defaultProps = {
  authorize: true,
  enableReinitialize: true,
};

function RecordForm(props) {
  const {
    resource,
    id,
    meta,
    authorize,

    // Record props
    lazy,

    // Form props
    validate,
    normalize,
    initialValues,
    enableReinitialize,
  } = props;

  const renderFunc = (recordProps, formProps) => {
    const { resetForm, getInputProps, getSubmitProps } = formProps;
    return renderProps(props, {
      getInputProps,
      getSubmitProps,
      resetForm,
    });
  };

  const handleSubmit = (values, submit) => {
    console.log('values', values);
    submit(values, { resource, id, authorize, ...meta });
  };

  /* eslint-disable react/jsx-key */
  return (
    <Compose
      components={[
        <Record {...{ lazy: lazy || !id, resource, id }} />,
        (render, { record }) => (
          <Form
            enableReinitialize={enableReinitialize}
            onSubmit={handleSubmit}
            name={RECORD_FORM}
            initialValues={initialValues || record}
            render={render}
            validate={validate}
            normalize={normalize}
          />
        ),
      ]}
      render={renderFunc}
    />
  );
}

export default RecordForm;
