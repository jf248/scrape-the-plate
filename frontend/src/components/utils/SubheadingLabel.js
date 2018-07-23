import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    whiteSpace: 'nowrap',
    '&:after': {
      content: '"\u00b7"',
      fontWeight: 'bold',
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    '&:last-child:after': {
      content: '""',
    },
  },
});

SubheadingLabel.defaultProps = {
  component: 'span',
};

function SubheadingLabel(props) {
  const {
    children,
    classes,
    className: classNameProp,
    component: Component,
    ...rest
  } = props;

  const className = classNames(classes.root, classNameProp);

  return (
    <Component className={className} {...rest}>
      {children}
    </Component>
  );
}

export default withStyles(styles)(SubheadingLabel);
