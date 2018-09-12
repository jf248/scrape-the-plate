import React from 'react';
import classNames from 'classnames';
import * as Mui from '@material-ui/core';

import { State } from 'lib/react-powerplug';

import { Bar } from './components';

const styles = theme => ({
  root: {
    width: '100%',
    display: 'flex',
    minHeight: '100vh',
  },
  bar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  main: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  mainShiftLeft: {
    marginLeft: '-240px',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: 'relative',
  },
});

function AppFrame(props) {
  const {
    barProgress,
    barRight,
    children,
    classes,
    drawerContent,
    title,
  } = props;

  const renderFunc = ({ state, setState }) => {
    const toggle = () => setState(prevState => ({ open: !prevState.open }));

    return (
      <div className={classes.root}>
        <Bar
          className={classes.bar}
          progress={barProgress}
          right={barRight}
          drawerToggle={toggle}
          title={title}
        />
        <Mui.Drawer
          onToggle={toggle}
          open={state.open}
          variant="persistent"
          classes={{ paper: classes.drawerPaper }}
        >
          <div className={classes.toolbar} />
          {drawerContent}
        </Mui.Drawer>
        <main
          className={classNames(classes.main, {
            [classes.mainShiftLeft]: !state.open,
          })}
        >
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    );
  };

  return <State initial={{ open: true }} render={renderFunc} />;
}

export default Mui.withStyles(styles)(AppFrame);
