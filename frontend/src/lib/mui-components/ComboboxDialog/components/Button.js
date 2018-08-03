import React from 'react';
import { Close } from '@material-ui/icons';
import { InputAdornment, ButtonBase } from '@material-ui/core';

function Button(props) {
  const {
    disabled,
    downshiftProps: { clearSelection },
  } = props;

  return (
    <ButtonBase disabled={disabled} onClick={() => clearSelection()}>
      <InputAdornment poisition="end">
        <Close />
      </InputAdornment>
    </ButtonBase>
  );
}

export default Button;
