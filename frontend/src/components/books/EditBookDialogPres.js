import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
} from '@material-ui/core';
import { TextField } from 'components/utils';

EditBookDialogPres.defaultProps = {};

function EditBookDialogPres(props) {
  const {
    isCreate,
    getInputProps,
    resetForm,
    getSubmitProps,
    isOpen,
    onClose,
  } = props;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{isCreate ? 'Add a book' : 'Edit book'}</DialogTitle>
      <DialogContent>
        <TextField {...getInputProps({ name: 'title', label: 'Title' })} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => resetForm()}>{'Reset'}</Button>
        <Button {...getSubmitProps()} color="primary">
          {isCreate ? 'Add' : 'Ok'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditBookDialogPres;
