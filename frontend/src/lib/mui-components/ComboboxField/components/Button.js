import React from 'react';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import Close from '@material-ui/icons/Close';
import { InputAdornment, ButtonBase } from '@material-ui/core';

function Button(props) {
  const {
    disabled,
    downshift: { clearSelection, inputValue, isOpen, toggleMenu },
    multiple,
    isControlledOpen,
  } = props;

  const Dummy = () => <div style={{ width: '24px', height: '32px' }} />;

  const getIcon = () => {
    if (disabled) {
      return Dummy;
    }

    if (isOpen && !isControlledOpen) {
      return ArrowDropUp;
    }

    if (inputValue && !multiple) {
      return Close;
    }

    if (isControlledOpen) {
      return Dummy;
    }

    return ArrowDropDown;
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
