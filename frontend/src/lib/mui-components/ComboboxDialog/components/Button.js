import React from 'react';
import Close from '@material-ui/icons/Close';
import { InputAdornment, ButtonBase, withStyles } from '@material-ui/core';

const style = theme => ({
  icon: {
    color: theme.palette.text.secondary,
  },
});

function Button(props) {
  const {
    classes,
    disabled,
    downshift: { clearSelection },
  } = props;

  return (
    <ButtonBase disabled={disabled} onClick={() => clearSelection()}>
      <InputAdornment poisition="end">
        <Close className={classes.icon} />
      </InputAdornment>
    </ButtonBase>
  );
}

export default withStyles(style)(Button);
