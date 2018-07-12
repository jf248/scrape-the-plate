import React from 'react';
import { withStyles } from '@material-ui/core';
import classnames from 'classnames';

import { noop } from '../utils';
import Button from './Button';
import SelectedItem from './SelectedItem';
import TextField from '../TextField';

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
    multiple,
    renderSelectedItem: renderSelectedItemProp,
    selectedItemFocusIndex,
    selectedItems,
    typeAheadText,
    ...rest
  } = props;

  const { selectItem, itemToString } = downshiftProps;

  const renderSelectedItem =
    renderSelectedItemProp ||
    (props => React.createElement(SelectedItem, props)); // eslint-disable-line react/display-name

  const withMargin = multiple && selectedItems && selectedItems.length > 0;

  const startAdornment =
    multiple && selectedItems.length > 0
      ? selectedItems.map((item, index) =>
          renderSelectedItem({
            hasFocus: index === selectedItemFocusIndex,
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
      downshiftProps={downshiftProps}
      multiple={multiple}
    />
  );

  const inputClassName = classnames({ [classes.withMarginBottom]: withMargin });

  const inputProps = { className: inputClassName, ...inputPropsProp };

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
