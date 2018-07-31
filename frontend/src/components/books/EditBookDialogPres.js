import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
} from '@material-ui/core';
import { Field } from 'components/common';

EditBookDialogPres.defaultProps = {};

export default function EditBookDialogPres(props) {
  const {
    getInputProps,
    getRootProps,
    getSubmitProps,
    isCreate,
    isOpen,
    isValid,
    onClose,
    onExit,
  } = props;

  return (
    <Dialog {...getRootProps({ open: isOpen, onClose, onExit })}>
      <DialogTitle>{isCreate ? 'Add a book' : 'Edit book'}</DialogTitle>
      <DialogContent>
        <Field
          {...getInputProps({ name: 'title', label: 'Title', autoFocus: true })}
        />
      </DialogContent>
      <DialogActions>
        <Button {...{ onClick: onClose, color: 'primary' }}>{'Cancel'}</Button>
        <Button
          {...getSubmitProps({ color: 'primary', disabled: isValid === false })}
        >
          {isCreate ? 'Add' : 'Ok'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
