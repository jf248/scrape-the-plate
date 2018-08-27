import React from 'react';
import { IconButton, Menu, withStyles } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';

const styles = () => ({});

MoreButtonPres.defaultProps = {};

function MoreButtonPres(props) {
  const {
    anchorEl,
    children,
    className: classNameProp,
    classes,
    icon,
    onClick,
    onClose,
    open,
    IconButtonProps,
    ...rest
  } = props;

  return (
    <React.Fragment>
      <IconButton
        aria-label="More"
        aria-haspopup="true"
        onClick={onClick}
        {...IconButtonProps}
      >
        {icon || <MoreVert />}
      </IconButton>
      <Menu {...{ anchorEl, open, onClose, ...rest }}>{children}</Menu>
    </React.Fragment>
  );
}

export default withStyles(styles)(MoreButtonPres);
