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
    initialValues,
    ...rest
  } = props;

  const renderFunc = (recordProps, formProps) => {
    return renderProps(props, formProps);
  };

  const handleSubmit = (values, submit) => {
    submit(values, { resource, id, authorize, ...meta });
  };

  /* eslint-disable react/jsx-key */
  return (
    <Compose
      components={[
        <Record {...{ lazy: lazy || !id, resource, id }} />,
        (render, { record }) => (
          <Form
            onSubmit={handleSubmit}
            name={RECORD_FORM}
            initialValues={initialValues || record}
            {...rest}
            render={render}
          />
        ),
      ]}
      render={renderFunc}
    />
  );
}

export default RecordForm;
