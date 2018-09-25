import React from 'react';
import * as Mui from '@material-ui/core';

import { Link } from 'lib/mui-components';

import { AppContent } from 'components/frame';

const styles = () => ({
  root: {
    paddingTop: 32,
  },
});

function About(props) {
  const { classes } = props;

  return (
    <AppContent className={classes.root}>
      <Mui.Typography variant={'body1'} paragraph>
        Scrape recipes, store them and keep them organised.
      </Mui.Typography>
      <Mui.Typography variant={'body1'} paragraph>
        Created with React, Redux and Django. Source code available{' '}
        <Link href={'https://www.github.com/jf248/scrape-the-plate'}>here</Link>
        .
      </Mui.Typography>
      <Mui.Typography variant={'body1'} paragraph>
        by <Link href={'https://www.github.com/jf248'}>Josh Freedman</Link>
      </Mui.Typography>
    </AppContent>
  );
}

export default Mui.withStyles(styles)(About);
