import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    color: theme.palette.primary['main'],
    textDecorationLine: 'none',
    '&:hover': {
      textDecorationLine: 'underline',
    },
    cursor: 'pointer',
  },
});

function Link(props) {
  const {
    children,
    classes,
    className: classNameProp,
    component,
    ...rest
  } = props;

  const className = classNames(classes.root, classNameProp);

  const Component = component || 'a';

  return (
    <Component className={className} {...rest}>
      {children}
    </Component>
  );
}

export default withStyles(styles)(Link);
