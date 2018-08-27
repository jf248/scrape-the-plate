/*
 * A wrapper around TextField.
 * Features:
 * - typeaheadText
 * - label shrinks if startAdornment is removed
 */

import React from 'react';
import classnames from 'classnames';
import { TextField as MuiTextField, withStyles } from '@material-ui/core';

import { InputComponent } from './components';

const styles = () => ({
  Input: {
    display: 'inline-flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
  },
});

TextField.defaultProps = {
  inputProps: {},
  InputProps: {},
  InputLabelProps: {},
};

function TextField(props) {
  const {
    classes,

    suggestion,
    typeAheadProps,

    inputProps: inputPropsProp,
    InputProps: { startAdornment, endAdornment, ...InputPropsProp },
    InputLabelProps: InputLabelPropsProp,
    multiline,
    ...rest
  } = props;

  const InputLabelProps = {
    shrink: !!startAdornment || undefined,
    ...InputLabelPropsProp,
  };

  const InputProps = {
    inputComponent: InputComponent,
    ...InputPropsProp,
    className: classnames(classes.Input, InputPropsProp.className),
  };

  const inputProps = {
    startAdornment,
    endAdornment,
    multiline,
    suggestion,
    typeAheadProps,
    ...inputPropsProp,
  };

  return (
    <MuiTextField
      {...{
        InputLabelProps,
        InputProps,
        inputProps,
        multiline,
        ...rest,
      }}
    />
  );
}

export default withStyles(styles)(TextField);
