import React from 'react';
import { InputAdornment, withStyles } from '@material-ui/core';

import { Field, Section } from 'components/common';

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
    ...rest
  } = props;

  const isError =
    !!cookTimeInputProps.error ||
    !!prepTimeInputProps.error ||
    !!servesInputProps.error;

  return (
    <Section title={'Details'} error={isError} {...rest}>
      <Field
        {...servesInputProps}
        className={classes.marginRight}
        label={'Serves'}
        type={'number'}
        step={1}
      />
      <Field
        {...prepTimeInputProps}
        className={classes.marginRight}
        label={'Prep. time'}
        type={'number'}
        step={1}
        InputProps={{
          endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
        }}
      />
      <Field
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
