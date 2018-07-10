import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 3,
  },
});

ControlWrapper.defaultProps = {};

function ControlWrapper(props) {
  const { children, classes, className: classNameProp, ...rest } = props;

  const className = classNames(classes.root, classNameProp);

  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
}

export default withStyles(styles)(ControlWrapper);
