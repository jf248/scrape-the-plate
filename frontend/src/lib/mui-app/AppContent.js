import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 100%',
    margin: '0 auto 64px auto',
    width: '100%',
    padding: '32px 24px 0px 24px',
    [theme.breakpoints.up('md')]: {
      maxWidth: '996px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '16px 24px 0px 24px',
    },
  },
  container: {
    position: 'relative',
    flex: '1 1 100%',
  },
});

function AppContent(props) {
  const { classes, className, children } = props;

  return (
    <div className={classes.root}>
      <div className={classNames(classes.container, className)}>{children}</div>
    </div>
  );
}

export default withStyles(styles)(AppContent);
