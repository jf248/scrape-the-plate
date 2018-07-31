import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

ConfirmationModalPres.defaultProps = {};

function ConfirmationModalPres(props) {
  const { isOpen, onClose, titleProps, title, text, onConfirm } = props;
  return (
    <Dialog open={isOpen} onClose={onClose} disableBackdropClick>
      <DialogTitle {...titleProps}>{title || 'Are you sure?'}</DialogTitle>
      {text && (
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button {...{ onClick: onClose, color: 'primary' }}>{'Cancel'}</Button>
        <Button {...{ onClick: onConfirm, color: 'primary' }}>{'Yes'}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationModalPres;
