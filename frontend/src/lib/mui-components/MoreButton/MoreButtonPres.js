import React from 'react';
import classNames from 'classnames';
import { IconButton, Menu, withStyles } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';

const styles = () => ({
  root: {},
});

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
  } = props;

  const className = classNames(classNameProp, classes.root);

  return (
    <React.Fragment>
      <IconButton
        aria-label="More"
        aria-haspopup="true"
        onClick={onClick}
        className={className}
      >
        {icon || <MoreVert />}
      </IconButton>
      <Menu {...{ anchorEl, open, onClose }}>{children}</Menu>
    </React.Fragment>
  );
}

export default withStyles(styles)(MoreButtonPres);
