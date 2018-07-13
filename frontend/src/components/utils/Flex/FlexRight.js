import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';

const styles = () => ({
  root: {
    display: 'flex',
    flex: '0 1 auto',
    justifyContent: 'flex-end',
  },
});

FlexRight.defaultProps = {
  component: 'div',
};

function FlexRight(props) {
  const {
    classes,
    className: classNameProp,
    component,
    children,
    ...rest
  } = props;

  const className = classNames(classes.root, classNameProp);

  const Component = component;

  return (
    <Component className={className} {...rest}>
      {children}
    </Component>
  );
}

export default withStyles(styles)(FlexRight);
