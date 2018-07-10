import React from 'react';
import { Typography, withStyles } from '@material-ui/core';

import { AppContent } from 'lib/mui-app';

const styles = () => ({
  root: {
    paddingTop: 32,
  },
});

function NotFound(props) {
  const { classes } = props;

  return (
    <AppContent className={classes.root}>
      <Typography variant={'title'} paragraph>
        {"Oops. Sorry, can't find that page."}
      </Typography>
    </AppContent>
  );
}

export default withStyles(styles)(NotFound);
