import React from 'react';
import { withStyles } from '@material-ui/core';

import { Field } from 'components/utils';

const styles = theme => ({
  root: {
    fontSize: theme.typography.title.fontSize,
  },
});

function TitleField(props) {
  const { classes, ...rest } = props;

  return (
    <Field
      inputProps={{
        className: classes.root,
      }}
      label={'Title'}
      fullWidth
      {...rest}
    />
  );
}

export default withStyles(styles)(TitleField);
