import React from 'react';
import ArrowDown from '@material-ui/icons/ArrowDropDown';
import ArrowUp from '@material-ui/icons/ArrowDropUp';
import Close from '@material-ui/icons/Close';
import { InputAdornment } from '@material-ui/core';

function Button(props) {
  const {
    disabled,
    downshiftProps: { clearSelection, inputValue, isOpen, toggleMenu },
    multiple,
  } = props;

  const Icon = isOpen ? ArrowUp : inputValue && !multiple ? Close : ArrowDown;

  const handleClick = () => {
    if (!isOpen && !!inputValue) {
      clearSelection();
    } else {
      toggleMenu();
    }
  };

  return disabled ? null : (
    <InputAdornment poisition="end" onClick={handleClick}>
      <Icon />
    </InputAdornment>
  );
}

export default Button;
