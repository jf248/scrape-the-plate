import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';

export const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    padding: `0 ${theme.spacing.unit}px ${theme.spacing.unit}px ${
      theme.spacing.unit
    }px`,
  },
});

function ExpansionDetails(props) {
  const { classes, children, className, ...other } = props;

  return (
    <div className={classNames(classes.root, className)} {...other}>
      {children}
    </div>
  );
}

export default withStyles(styles)(ExpansionDetails);
