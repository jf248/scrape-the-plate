import React from 'react';
import { IconButton, Snackbar, withStyles } from '@material-ui/core';
import Close from '@material-ui/icons/Close';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

function SnackbarPres(props) {
  const { classes, isOpen, onClose, message, ...rest } = props;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    } else {
      onClose();
    }
  };

  return (
    <Snackbar
      open={isOpen}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      autoHideDuration={6000}
      onClose={onClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={handleClose}
        >
          <Close />
        </IconButton>,
      ]}
      message={<span>{message}</span>}
      {...rest}
    />
  );
}
export default withStyles(styles)(SnackbarPres);
