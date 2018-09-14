import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';

import MaxWidth from './MaxWidth';

const styles = theme => ({
  root: {
    flex: '1 1 100%',
    paddingTop: '32px',
    paddingBottom: '104px',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '16px',
    },
    overflowY: 'scroll',
  },
});

function AppContent(props) {
  const { classes, className, children } = props;

  return (
    <MaxWidth className={classNames(classes.root, className)}>
      {children}
    </MaxWidth>
  );
}

export default withStyles(styles)(AppContent);
