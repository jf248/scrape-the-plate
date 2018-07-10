import React from 'react';
import classNames from 'classnames';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  withStyles,
} from '@material-ui/core';

const styles = () => ({
  root: {},
});

ResetDialog.defaultProps = {};

function ResetDialog(props) {
  const {
    open,
    onClose,
    resetForm,
    classes,
    className: classNameProp,
    ...rest
  } = props;

  const className = classNames(classes.root, classNameProp);

  return (
    <Dialog open={open} onClose={onClose} className={className} {...rest}>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to clear the form?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color={'primary'}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            resetForm();
            onClose();
          }}
        >
          Reset
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withStyles(styles)(ResetDialog);
