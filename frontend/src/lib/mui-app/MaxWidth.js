import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';

const MAX_WIDTH = 996;

const styles = theme => ({
  root: {
    width: '100%',
  },
  container: {
    margin: '0 auto 0 auto',
    paddingLeft: '24px',
    paddingRight: '24px',
    maxWidth: MAX_WIDTH,
  },
});

function AppContent(props) {
  const { classes, className, children } = props;

  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.container}>{children}</div>
    </div>
  );
}

export default withStyles(styles)(AppContent);
