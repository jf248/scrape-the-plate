import React from 'react';

import { Compose } from 'lib/react-powerplug';

import { RecordForm } from 'controllers/record-form';
import { Modal } from 'controllers/modal';
import EditResourceDialogPres from './EditResourceDialogPres';

function EditResourceDialog({
  name,
  component,
  resource,
  resourceName,
  ...rest
}) {
  const renderFunc = (modal, recordForm) => {
    const {
      isOpen,
      modalProps: { id },
      onClose,
    } = modal;
    const {
      getInputProps,
      getRootProps,
      getSubmitProps,
      resetForm,
    } = recordForm;
    const isCreate = !id;

    const onExit = () => resetForm();

    return (
      <EditResourceDialogPres
        {...{
          getInputProps,
          getRootProps,
          getSubmitProps,
          isCreate,
          isOpen,
          onClose,
          onExit,

          component,
          resourceName,
        }}
      />
    );
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[
        <Modal provider name={name} />,
        (render, { modalProps: { id } }) => (
          <RecordForm
            {...{
              id,
              meta: {
                onSuccess: {
                  snackbar: {},
                  closeModal: { name },
                },
              },
              render,
              resource,
              ...rest,
            }}
          />
        ),
      ]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default EditResourceDialog;
