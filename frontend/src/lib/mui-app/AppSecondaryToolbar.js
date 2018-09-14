import React from 'react';
import classNames from 'classnames';
import * as Mui from '@material-ui/core';

import MaxWidth from './MaxWidth';

const styles = theme => ({
  root: {
    width: '100%',
    zIndex: theme.zIndex.drawer,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
});

function AppSecondaryToolbar(props) {
  const { children, classes, className } = props;

  return (
    <Mui.Paper
      square
      elevation={0}
      className={classNames(classes.root, className)}
    >
      <MaxWidth>
        <Mui.Toolbar disableGutters variant={'dense'}>
          {children}
        </Mui.Toolbar>
      </MaxWidth>
    </Mui.Paper>
  );
}

export default Mui.withStyles(styles)(AppSecondaryToolbar);
