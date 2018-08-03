import React from 'react';
import { Typography, withStyles } from '@material-ui/core';

import { AppContent } from 'lib/mui-app';
import { Link } from 'lib/mui-components';

const styles = () => ({
  root: {
    paddingTop: 32,
  },
});

function About(props) {
  const { classes } = props;

  return (
    <AppContent className={classes.root}>
      <Typography variant={'body1'} paragraph>
        Scrape recipes, store them and keep them organised.
      </Typography>
      <Typography variant={'body1'} paragraph>
        Created with React, Redux and Django. Source code available{' '}
        <Link href={'https://www.github.com/jf248/scrape-the-plate'}>here</Link>
        .
      </Typography>
      <Typography variant={'body1'} paragraph>
        by <Link href={'https://www.github.com/jf248'}>Josh Freedman</Link>
      </Typography>
    </AppContent>
  );
}

export default withStyles(styles)(About);
