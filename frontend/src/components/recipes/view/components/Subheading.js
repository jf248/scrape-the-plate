import React from 'react';
import classNames from 'classnames';
import { Typography, withStyles } from '@material-ui/core';

const styles = () => ({
  root: {},
});

Subheading.defaultProps = {};

function Subheading(props) {
  const { children, classes, className: classNameProp, ...rest } = props;

  const className = classNames(classes.root, classNameProp);

  return (
    <Typography
      className={className}
      variant={'subheading'}
      color={'textSecondary'}
      {...rest}
    >
      {children}
    </Typography>
  );
}

export default withStyles(styles)(Subheading);
