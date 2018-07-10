import React from 'react';
import { Drawer as MuiDrawer, withStyles } from '@material-ui/core';
import DrawerList from './DrawerList';

const styles = () => ({
  list: {
    width: 250,
  },
});

function Drawer(props) {
  const { classes, drawerConfig, onToggle, open } = props;

  return (
    <MuiDrawer open={open} onClose={onToggle}>
      <div tabIndex={0} role="button" onClick={onToggle} onKeyDown={onToggle}>
        <div className={classes.list}>
          <DrawerList drawerConfig={drawerConfig} />
        </div>
      </div>
    </MuiDrawer>
  );
}

export default withStyles(styles)(Drawer);
