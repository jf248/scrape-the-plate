import React from 'react';
import {
  Button,
  DialogContent,
  DialogActions,
  withStyles,
} from '@material-ui/core';

import { Field } from 'components/utils';

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
        <Field
          {...getInputProps({
            className: classes.field,
            label: 'First name',
            name: 'first_name',
          })}
        />
        <Field
          {...getInputProps({
            className: classes.field,
            label: 'Last name',
            name: 'last_name',
          })}
        />
        <Field
          {...getInputProps({
            className: classes.field,
            label: 'Email',
            name: 'username',
          })}
        />
        <Field
          {...getInputProps({
            className: classes.field,
            name: 'password',
            label: 'Password',
            type: 'password',
          })}
        />
        <Field
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
