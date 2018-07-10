import React from 'react';
import classNames from 'classnames';
import { withStyles, CardActions } from '@material-ui/core';

const styles = () => ({
  root: {
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
});

Actions.defaultProps = {};

function Actions(props) {
  const {
    children,
    classes,
    className: classNameProp,
    component,
    ...rest
  } = props;

  const className = classNames(classes.root, classNameProp);

  const Component = component || CardActions;

  return (
    <Component className={className} {...rest}>
      {children}
    </Component>
  );
}

export default withStyles(styles)(Actions);
