import React from 'react';
import ArrowDown from '@material-ui/icons/ArrowDropDown';
import ArrowUp from '@material-ui/icons/ArrowDropUp';
import Close from '@material-ui/icons/Close';
import { InputAdornment, ButtonBase } from '@material-ui/core';

function Button(props) {
  const {
    disabled,
    downshiftProps: { clearSelection, inputValue, isOpen, toggleMenu },
    multiple,
    isControlledOpen,
  } = props;

  const Dummy = () => <div style={{ width: '24px', height: '32px' }} />;

  const getIcon = () => {
    if (disabled) {
      return Dummy;
    }

    if (isOpen && !isControlledOpen) {
      return ArrowUp;
    }

    if (inputValue && !multiple) {
      return Close;
    }

    if (isControlledOpen) {
      return Dummy;
    }

    return ArrowDown;
  };

  const handleClick = () => {
    if (disabled) {
      return;
    }

    if (isOpen && !isControlledOpen) {
      return toggleMenu();
    }

    if (inputValue && !multiple) {
      return clearSelection();
    }

    if (isControlledOpen) {
      return;
    }

    return toggleMenu();
  };

  return (
    <ButtonBase onClick={handleClick}>
      <InputAdornment poisition="end">
        {React.createElement(getIcon())}
      </InputAdornment>
    </ButtonBase>
  );
}

export default Button;
