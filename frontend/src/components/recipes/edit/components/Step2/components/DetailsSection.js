import React from 'react';
import { InputAdornment, withStyles } from '@material-ui/core';

import { TextField } from 'components/utils';
import Section from './Section';

const styles = theme => ({
  marginRight: {
    marginRight: theme.spacing.unit * 2,
  },
});

function DetailsSection(props) {
  const {
    classes,
    cookTimeInputProps,
    prepTimeInputProps,
    servesInputProps,
  } = props;

  return (
    <Section title={'Details'}>
      <TextField
        {...servesInputProps}
        className={classes.marginRight}
        label={'Serves'}
        type={'number'}
        step={1}
      />
      <TextField
        {...prepTimeInputProps}
        className={classes.marginRight}
        label={'Prep. time'}
        type={'number'}
        step={1}
        InputProps={{
          endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
        }}
      />
      <TextField
        {...cookTimeInputProps}
        className={classes.marginRight}
        label={'Cooking time'}
        type={'number'}
        step={1}
        InputProps={{
          endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
        }}
      />
    </Section>
  );
}

export default withStyles(styles)(DetailsSection);
