import React from 'react';
import classNames from 'classnames';

import * as Enhanced from 'lib/mui-components';

import * as Mui from '@material-ui/core';

const styles = theme => ({
  root: {},
  marginBottom: {
    marginBottom: theme.spacing.unit,
  },
  chip: {
    marginBottom: theme.spacing.unit,
    marginRight: theme.spacing.unit / 2,
  },
});

ChipField.defaultProps = {
  InputProps: {},
};

function ChipField(props) {
  const {
    classes,
    className: classNameProp,
    value: valueProp,
    InputProps: InputPropsProp,
    inputProps: inputPropsProp,
    ...rest
  } = props;

  const value = valueProp ? valueProp : [];

  const className = classNames(classes.root, classNameProp);
  const startAdornment = value.map((label, key) => (
    <Mui.Chip {...{ className: classes.chip, label, key }} />
  ));
  const InputProps = {
    startAdornment,
    ...InputPropsProp,
  };
  const inputClassName = classNames({
    [classes.marginBottom]: value.length > 0,
  });
  const inputProps = {
    className: inputClassName,
    ...inputPropsProp,
  };

  return (
    <Enhanced.TextField
      {...{
        className,
        InputProps,
        inputProps,
        ...rest,
      }}
    />
  );
}

export default Mui.withStyles(styles)(ChipField);
