import React from 'react';
import {
  Button,
  DialogContent,
  DialogActions,
  withStyles,
} from '@material-ui/core';

import { TextField } from 'components/utils';

const styles = () => ({
  field: {
    display: 'block',
  },
});

LoginContentPres.defaultProps = {};

function LoginContentPres(props) {
  const { classes, getInputProps, getSubmitProps, onClose } = props;

  return (
    <React.Fragment>
      <DialogContent>
        <TextField
          {...getInputProps({
            className: classes.field,
            label: 'Email',
            name: 'username',
          })}
        />
        <TextField
          {...getInputProps({
            className: classes.field,
            name: 'password',
            label: 'Password',
            type: 'password',
          })}
        />
      </DialogContent>
      <DialogActions>
        <Button size={'small'} onClick={onClose}>
          Cancel
        </Button>
        <Button {...getSubmitProps()} size={'small'} color={'primary'}>
          Log in
        </Button>
      </DialogActions>
    </React.Fragment>
  );
}

export default withStyles(styles)(LoginContentPres);
