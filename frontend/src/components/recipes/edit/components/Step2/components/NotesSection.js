import React from 'react';
import { withStyles } from '@material-ui/core';

import { Field, Section } from 'components/common';

const styles = () => ({
  root: {},
});

function NotesSection(props) {
  const { classes, inputProps, ...rest } = props; // eslint-disable-line no-unused-vars

  return (
    <Section title={'Notes'} {...rest}>
      <Field
        {...inputProps}
        placeholder={'Notes...'}
        fullWidth
        multiline={true}
      />
    </Section>
  );
}

export default withStyles(styles)(NotesSection);
