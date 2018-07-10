import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';

const styles = () => ({
  root: {
    flex: '0 1 auto',
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

ActionsRight.defaultProps = {};

function ActionsRight(props) {
  const {
    children,
    classes,
    className: classNameProp,
    component,
    ...rest
  } = props;

  const className = classNames(classes.root, classNameProp);

  const Component = component || 'div';

  return (
    <Component className={className} {...rest}>
      {children}
    </Component>
  );
}

export default withStyles(styles)(ActionsRight);
