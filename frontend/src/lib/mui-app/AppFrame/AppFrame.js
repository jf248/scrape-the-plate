import React from 'react';
import classNames from 'classnames';
import * as Mui from '@material-ui/core';

import { State } from 'lib/react-powerplug';

import { AppBar } from './components';

const styles = theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  bar: {
    flex: '0 0 auto',
    zIndex: theme.zIndex.drawer + 1,
  },
  underBar: {
    flex: '1 1 100%',
    display: 'flex',
  },
  main: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowY: 'hidden',
    display: 'flex',
    flexDirection: 'column',
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
    flex: '0 0 auto',
    position: 'static',
  },
});

function AppFrame(props) {
  const {
    barProgress,
    barLeft,
    barRight,
    children,
    classes,
    className,
    drawerContent,
    title,
    variant,
    onGoBack,
    ...rest
  } = props;

  const renderFunc = ({ state, setState }) => {
    const onMenuClick = () => {
      if (variant === 'back') {
        onGoBack && onGoBack();
        return;
      }
      setState(prevState => ({ open: !prevState.open }));
    };

    return (
      <div className={classNames(classes.root, className)} {...rest}>
        <AppBar
          className={classes.bar}
          progress={barProgress}
          right={barRight}
          left={barLeft}
          onMenuClick={onMenuClick}
          title={title}
          position={'static'}
          variant={variant}
        />
        <div className={classes.underBar}>
          <Mui.Drawer
            onToggle={onMenuClick}
            open={state.open}
            variant="persistent"
            classes={{ paper: classes.drawerPaper }}
          >
            {drawerContent}
          </Mui.Drawer>
          <main
            className={classNames(classes.main, {
              [classes.mainShiftLeft]: !state.open,
            })}
          >
            {children}
          </main>
        </div>
      </div>
    );
  };

  return <State initial={{ open: true }} render={renderFunc} />;
}

export default Mui.withStyles(styles)(AppFrame);
