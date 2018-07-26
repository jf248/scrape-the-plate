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

LoginContentPres.defaultProps = {};

function LoginContentPres(props) {
  const { classes, getInputProps, getSubmitProps, onClose } = props;

  return (
    <React.Fragment>
      <DialogContent>
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
