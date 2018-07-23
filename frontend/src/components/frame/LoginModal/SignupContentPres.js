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

function SignupContentPres(props) {
  const { classes, getInputProps, getSubmitProps, onClose } = props;
  return (
    <React.Fragment>
      <DialogContent>
        <TextField
          {...getInputProps({
            className: classes.field,
            label: 'First name',
            name: 'first_name',
          })}
        />
        <TextField
          {...getInputProps({
            className: classes.field,
            label: 'Last name',
            name: 'last_name',
          })}
        />
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
        <TextField
          {...getInputProps({
            className: classes.field,
            name: 'retypePassword',
            label: 'Retype password',
            type: 'password',
          })}
        />
      </DialogContent>
      <DialogActions>
        <Button size={'small'} onClick={onClose}>
          Cancel
        </Button>
        <Button {...getSubmitProps()} size={'small'} color={'primary'}>
          Sign up
        </Button>
      </DialogActions>
    </React.Fragment>
  );
}

export default withStyles(styles)(SignupContentPres);
