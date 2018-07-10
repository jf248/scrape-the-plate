import React from 'react';

import { Compose } from 'lib/react-powerplug';
import { Modals } from 'lib/mui-components';

import RecordForm from 'controllers/RecordForm';
import validate from './validate';
import normalize from './normalize';
import Step2Pres from './Step2Pres';

function Step2(props) {
  const { id, goBack, isCreate, initialValues } = props;

  const renderFunc = (recordForm, modals) => {
    const { getInputProps, resetForm, getSubmitProps } = recordForm;
    const { getModalProps, openModal } = modals;
    return (
      <Step2Pres
        {...{
          isCreate,
          goBack,
          getInputProps,
          resetForm,
          getSubmitProps,
          getModalProps,
          openModal,
        }}
      />
    );
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[
        <RecordForm
          {...{
            resource: 'recipes',
            id,
            validate,
            normalize,
            initialValues,
            meta: { redirect: {}, snackbar: {} },
          }}
        />,
        <Modals />,
      ]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default Step2;
