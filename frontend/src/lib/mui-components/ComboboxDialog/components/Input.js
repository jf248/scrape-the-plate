import React from 'react';
import { withStyles } from '@material-ui/core';
import classnames from 'classnames';

import TextField from 'lib/mui-components/TextField'; // eslint-disable-line import/no-internal-modules

import Chip from './Chip';
import Button from './Button';

Input.defaultProps = {
  selectedItems: [],
  inputProps: {},
  InputProps: {},
};

const styles = theme => ({
  withMarginBottom: {
    marginBottom: theme.spacing.unit,
  },
});

function Input(props) {
  const {
    classes,
    disabled,
    downshiftProps,
    inputProps: inputPropsProp,
    InputProps: InputPropsProp,
    isControlledOpen,
    multiple,
    selectedItemFocusIndex,
    selectedItems,
    typeAheadText,
    ...rest
  } = props;

  const { selectItem, itemToString, inputValue } = downshiftProps;

  const withMargin = multiple && selectedItems && selectedItems.length > 0;

  const startAdornment =
    multiple && selectedItems.length > 0
      ? selectedItems.map((item, index) => (
          <Chip
            {...{
              hasFocus: index === selectedItemFocusIndex,
              item,
              itemToString,
              deselect: disabled ? () => {} : () => selectItem(item),
              key: itemToString(item),
            }}
          />
        ))
      : null;

  const endAdornment = inputValue ? (
    <Button
      className={classnames({ [classes.withMarginBottom]: withMargin })}
      disabled={disabled}
      downshiftProps={downshiftProps}
      multiple={multiple}
      isControlledOpen={isControlledOpen}
    />
  ) : (
    undefined
  );

  const inputClassName = classnames({ [classes.withMarginBottom]: withMargin });

  const inputProps = {
    className: inputClassName,
    autoComplete: 'off',
    ...inputPropsProp,
  };

  const InputProps = {
    startAdornment,
    endAdornment,
    ...InputPropsProp,
  };

  return (
    <TextField
      {...downshiftProps.getInputProps({
        disabled,
        inputProps,
        InputProps,
        typeAheadText,
        ...rest,
      })}
    />
  );
}

export default withStyles(styles)(Input);
