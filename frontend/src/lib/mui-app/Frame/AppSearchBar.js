import React from 'react';
import classNames from 'classnames';
import { withStyles, Card, CardContent } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    minHeight: '64px',
  },
  content: {
    margin: '0 auto',
    [theme.breakpoints.up('md')]: {
      maxWidth: '900px',
    },
  },
});

function AppSearchBar(props) {
  const { children, classes, className: classNameProp } = props;

  const className = classNames(classes.root, classNameProp);

  return (
    <Card component={'div'} className={className}>
      <CardContent className={classes.content}>{children}</CardContent>
    </Card>
  );
}

export default withStyles(styles)(AppSearchBar);
