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
    onClose,
    onExit,
    component: Component,
    resourceName,
  } = props;

  return (
    <Dialog {...getRootProps({ open: isOpen, onClose, onExit })}>
      <DialogTitle>
        {isCreate ? `Add a ${resourceName}` : `Edit ${resourceName}`}
      </DialogTitle>
      <DialogContent>
        <Component {...{ getInputProps }} />
      </DialogContent>
      <DialogActions>
        <Button {...{ onClick: onClose, color: 'primary' }}>{'Cancel'}</Button>
        <Button {...getSubmitProps({ color: 'primary' })}>
          {isCreate ? 'Add' : 'Ok'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
