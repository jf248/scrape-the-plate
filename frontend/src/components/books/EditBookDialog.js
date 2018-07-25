import React from 'react';

import { Compose } from 'lib/react-powerplug';
import { compose, isRequired } from 'lib/form/validators';

import { toTitleCase } from 'utils';
import RecordForm from 'controllers/RecordForm';
import Modal from 'controllers/Modal';
import EditBookDialogPres from './EditBookDialogPres';
import { EDIT_BOOK_DIALOG } from './names';

const normalize = values => {
  return {
    ...values,
    title: toTitleCase(values['title']),
  };
};
const validate = compose(isRequired(['title']));

function EditBookDialog() {
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
      isValid,
      resetForm,
    } = recordForm;
    const isCreate = !id;

    const onExit = () => resetForm();

    return (
      <EditBookDialogPres
        {...{
          getInputProps,
          getRootProps,
          getSubmitProps,
          isCreate,
          isOpen,
          isValid,
          onClose,
          onExit,
        }}
      />
    );
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[
        <Modal provider name={EDIT_BOOK_DIALOG} />,
        (render, { modalProps: { id } }) => (
          <RecordForm
            {...{
              id,
              normalize,
              meta: {
                onSuccess: {
                  snackbar: {},
                  closeModal: { name: EDIT_BOOK_DIALOG },
                },
              },
              render,
              resource: 'books',
              validate,
            }}
          />
        ),
      ]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default EditBookDialog;
