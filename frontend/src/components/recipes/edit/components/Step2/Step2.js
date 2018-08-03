import React from 'react';

import { Compose } from 'lib/react-powerplug';
import * as Enhanced from 'lib/mui-components';

import { RecordForm } from 'controllers/record-form';
import validate from './validate';
import normalize from './normalize';
import Step2Pres from './Step2Pres';

function Step2(props) {
  const { id, goBack, isCreate, initialValues } = props;

  const renderFunc = (recordForm, modals) => {
    const { getInputProps, resetForm, getSubmitProps } = recordForm;
    const { getModalProps, onOpen: onOpenModal } = modals;
    return (
      <Step2Pres
        {...{
          getInputProps,
          getModalProps,
          getSubmitProps,
          goBack,
          isCreate,
          onOpenModal,
          resetForm,
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
            meta: { onSuccess: { redirect: {}, snackbar: {} } },
          }}
        />,
        <Enhanced.ModalController />,
      ]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default Step2;
