import React from 'react';
import { TextField, withStyles } from '@material-ui/core';
import classnames from 'classnames';

import { noop } from '../utils';
import InputWithTypeahead from '../InputWithTypeahead';
import Button from './Button';
import SelectedItem from './SelectedItem';

Input.defaultProps = {
  selectedItems: [],
  inputProps: {},
  InputProps: {},
};

const styles = theme => ({
  // eslint-disable-line no-unused-vars
  typeAheadRoot: {
    flex: '1000 1 6px',
  },
  Input: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
  },
  withMarginBottom: {
    marginBottom: theme.spacing.unit,
  },
});

function Input(props) {
  const {
    classes,
    disabled,
    downshiftProps,
    inputProps: {
      typeAheadRootProps: {
        className: typeAheadRootClassName,
        typeAheadRootPropsProp,
      } = {},
      ...inputPropsProp
    } = {},
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

  const rootProps = {
    className: classnames(
      classes.typeAheadRoot,
      { [classes.withMarginBottom]: withMargin },
      typeAheadRootClassName
    ),
    ...typeAheadRootPropsProp,
  };

  const inputProps = { rootProps, typeAheadText, ...inputPropsProp };

  const InputProps = {
    startAdornment,
    endAdornment,
    inputComponent: InputWithTypeahead,
    ...InputPropsProp,
    className: classnames(classes.Input, InputPropsProp.className),
  };

  const InputLabelProps = {
    shrink: selectedItems.length > 0 || undefined,
  };

  return (
    <TextField
      {...downshiftProps.getInputProps({
        className: classes.textField,
        disabled,
        inputProps,
        InputProps,
        InputLabelProps,
        ...rest,
      })}
    />
  );
}

export default withStyles(styles)(Input);
