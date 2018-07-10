import React from 'react';
import { TextField, withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    fontSize: theme.typography.title.fontSize,
  },
});

function TitleField(props) {
  const { classes, value, error, touched, ...rest } = props;

  return (
    <TextField
      inputProps={{
        className: classes.root,
      }}
      fullWidth
      id={'title'}
      margin={'normal'}
      label={'Title'}
      value={value || ''}
      error={touched && !!error}
      helperText={touched && error}
      {...rest}
    />
  );
}

export default withStyles(styles)(TitleField);
