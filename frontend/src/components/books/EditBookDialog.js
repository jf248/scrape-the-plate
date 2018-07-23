import React from 'react';

import { Compose } from 'lib/react-powerplug';
import { compose, isRequired } from 'lib/form/validators';
import { Auth } from 'lib/auth';

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
  const renderFunc = (auth, modal, recordForm) => {
    const {
      isOpen,
      onClose,
      modalProps: { id },
    } = modal;
    const { getInputProps, getSubmitProps, resetForm } = recordForm;
    const isCreate = !id;

    return (
      <EditBookDialogPres
        {...{
          isCreate,
          getInputProps,
          resetForm,
          getSubmitProps,
          isOpen,
          onClose,
        }}
      />
    );
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[
        <Auth />,
        <Modal provider name={EDIT_BOOK_DIALOG} />,
        (render, { user: { id: userId } }, { modalProps: { id } }) => (
          <RecordForm
            {...{
              resource: 'books',
              id,
              validate,
              normalize,
              initialValues: { id, user: userId },
              meta: {
                onSuccess: {
                  snackbar: {},
                  closeModal: { name: EDIT_BOOK_DIALOG },
                },
              },
              render,
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
