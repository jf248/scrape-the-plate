import React from 'react';
import { withStyles } from '@material-ui/core';
import classnames from 'classnames';

import { noop } from 'lib/mui-components/utils'; // eslint-disable-line import/no-internal-modules
import Button from './Button';
import SelectedItem from './SelectedItem';
import TextField from 'lib/mui-components/TextField'; // eslint-disable-line import/no-internal-modules

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
    renderSelectedItem: renderSelectedItemProp,
    focusIndex,
    selectedItems,
    suggestion,
    ...rest
  } = props;

  const { selectItem, itemToString } = downshift;

  const renderSelectedItem =
    renderSelectedItemProp ||
    (props => React.createElement(SelectedItem, props)); // eslint-disable-line react/display-name

  const withMargin = multiple && selectedItems && selectedItems.length > 0;

  const startAdornment =
    multiple && selectedItems.length > 0
      ? selectedItems.map((item, index) =>
          renderSelectedItem({
            hasFocus: index === focusIndex,
            item,
            itemToString,
            deselect: disabled ? noop : () => selectItem(item),
            key: itemToString(item),
          })
        )
      : null;

  const endAdornment = (
    <Button
      className={classnames({ [classes.withMarginBottom]: withMargin })}
      disabled={disabled}
      downshift={downshift}
      multiple={multiple}
      isControlledOpen={isControlledOpen}
    />
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
