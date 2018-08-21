import React from 'react';
import { withStyles } from '@material-ui/core';

import { State } from 'lib/react-powerplug';

import { Drawer, Bar } from './components';

const styles = () => ({
  root: {
    width: '100%',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
  },
  belowAppBar: {
    flex: '1 1 100%',
    paddingTop: '64px',
    display: 'flex',
    flexDirection: 'column',
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
          progress={barProgress}
          right={barRight}
          drawerToggle={toggle}
          title={title}
        />
        <Drawer onToggle={toggle} open={state.open}>
          {drawerContent}
        </Drawer>
        <div className={classes.belowAppBar}>{children}</div>
      </div>
    );
  };

  return <State initial={{ open: false }} render={renderFunc} />;
}

export default withStyles(styles)(AppFrame);
