import React from 'react';
import classNames from 'classnames';
import * as Mui from '@material-ui/core';
import Group from '@material-ui/icons/Group';

const styles = theme => ({
  root: {
    color: theme.palette.primary.main,
    '&$off': {
      color: theme.palette.action.disabled,
    },
  },
  off: {},
});

PublicToggle.defaultProps = {};

function PublicToggle(props) {
  const { classes, className: classNameProp, value, onToggle, ...rest } = props;

  const className = classNames(
    classes.root,
    { [classes.off]: !!value },
    classNameProp
  );

  return (
    <Mui.Tooltip
      title={value ? 'Show all public recipes' : 'Only show my recipes'}
    >
      <Mui.IconButton
        className={className}
        color="primary"
        onClick={onToggle}
        {...rest}
      >
        <Group />
      </Mui.IconButton>
    </Mui.Tooltip>
  );
}

export default Mui.withStyles(styles)(PublicToggle);
