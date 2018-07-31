import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';

import WithSeparator from './WithSeparator';

const styles = theme => ({
  root: {},
});

SubheadingItem.defaultProps = {
  labelProps: {},
};

function SubheadingItem(props) {
  const {
    children,
    classes,
    className: classNameProp,
    label,
    labelProps,
    ...rest
  } = props;

  const className = classNames(classes.root, classNameProp);

  return (
    <WithSeparator className={className} {...rest}>
      <span {...labelProps}>{`${label} `}</span>
      {children}
    </WithSeparator>
  );
}

export default withStyles(styles)(SubheadingItem);
