import React from 'react';
import classNames from 'classnames';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
  withStyles,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

const styles = {
  root: {
    '@media print': {
      display: 'none',
    },
  },
  flex: {
    flex: '1',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  oneLine: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
};

AppBar.defaultProps = {};

function AppBar(props) {
  const {
    classes,
    className: classNameProp,
    drawerToggle,
    progress,
    right,
    title,
    rest,
  } = props;
  const className = classNames(classNameProp, classes.root);

  return (
    <MuiAppBar position="fixed" className={className} {...rest}>
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={drawerToggle}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="title"
          color="inherit"
          className={classNames(classes.flex, classes.oneLine)}
        >
          {title}
        </Typography>
        {right}
      </Toolbar>
      {progress}
    </MuiAppBar>
  );
}

export default withStyles(styles)(AppBar);
