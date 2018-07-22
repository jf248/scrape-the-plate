import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  label: {
    color: theme.typography.subheading.color,
  },
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

SubheadingLabel.defaultProps = {};

function SubheadingLabel(props) {
  const { classes, className: classNameProp, label, content, ...rest } = props;

  const className = classNames(classes.root, classNameProp);

  return (
    <span className={className} {...rest}>
      <span className={classes.label}>{`${label}: `}</span>
      <span>{content}</span>
    </span>
  );
}

export default withStyles(styles)(SubheadingLabel);
