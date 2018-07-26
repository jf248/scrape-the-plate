import React from 'react';
import { withStyles } from '@material-ui/core';

import { Field } from 'components/utils';

import Section from './Section';

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
