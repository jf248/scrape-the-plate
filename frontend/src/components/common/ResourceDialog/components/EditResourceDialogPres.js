import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
} from '@material-ui/core';

EditTagDialogPres.defaultProps = {};

export default function EditTagDialogPres(props) {
  const {
    getInputProps,
    getRootProps,
    getSubmitProps,
    isCreate,
    isOpen,
    isValid,
    onClose,
    onExit,
    component: Component,
    resourceNameSingular,
  } = props;

  return (
    <Dialog {...getRootProps({ open: isOpen, onClose, onExit })}>
      <DialogTitle>
        {isCreate
          ? `Add a ${resourceNameSingular}`
          : `Edit ${resourceNameSingular}`}
      </DialogTitle>
      <DialogContent>
        <Component {...{ getInputProps }} />
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
