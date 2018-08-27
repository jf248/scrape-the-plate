import React from 'react';
import * as Mui from '@material-ui/core';

import { Field, Section } from 'components/common';

const styles = () => ({
  root: {},
});

function NotesSection(props) {
  const { classes, inputProps, ...rest } = props; // eslint-disable-line no-unused-vars
  const isError = !!inputProps.error;

  return (
    <Section title={'Notes'} error={isError} {...rest}>
      <Field
        {...inputProps}
        component={Mui.TextField}
        placeholder={'Notes...'}
        fullWidth
        multiline={true}
      />
    </Section>
  );
}

export default Mui.withStyles(styles)(NotesSection);
