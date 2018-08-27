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
    downshift,
    inputProps: inputPropsProp,
    InputProps: InputPropsProp,
    isControlledOpen,
    multiple,
    focusIndex,
    selectedItems,
    suggestion,
    ...rest
  } = props;

  const { selectItem, itemToString, inputValue } = downshift;

  const withMargin = multiple && selectedItems && selectedItems.length > 0;

  const startAdornment =
    multiple && selectedItems.length > 0
      ? selectedItems.map((item, index) => (
          <Chip
            {...{
              hasFocus: index === focusIndex,
              item,
              itemToString,
              deselect: disabled ? () => {} : () => selectItem(item),
              key: itemToString(item),
            }}
          />
        ))
      : null;

  const endAdornment =
    inputValue && !multiple ? (
      <Button
        className={classnames({ [classes.withMarginBottom]: withMargin })}
        disabled={disabled}
        downshift={downshift}
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
      {...downshift.getInputProps({
        disabled,
        inputProps,
        InputProps,
        suggestion,
        ...rest,
      })}
    />
  );
}

export default withStyles(styles)(Input);
