import React from 'react';
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
    flex: '0.5',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

AppBar.defaultProps = {};

function AppBar(props) {
  const {
    classes,
    drawerToggle,
    title,
    ActionsComponent: ActionsComponentProp,
    MiddleComponent: MiddleComponentProp,
  } = props;

  const ActionsComponent = ActionsComponentProp || (() => <div />);
  const MiddleComponent = MiddleComponentProp || (() => <div />);

  return (
    <MuiAppBar position="fixed" className={classes.root}>
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={drawerToggle}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="title" color="inherit" className={classes.flex}>
          {title}
        </Typography>
        <div className={classes.flex}>
          <MiddleComponent />
        </div>
        <ActionsComponent />
      </Toolbar>
    </MuiAppBar>
  );
}

export default withStyles(styles)(AppBar);
