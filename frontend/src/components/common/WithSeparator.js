import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
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
  halfMargin: {
    '&:after': {
      marginLeft: theme.spacing.unit / 2,
      marginRight: theme.spacing.unit / 2,
    },
  },
});

WithSeparator.defaultProps = {
  component: 'span',
  halfMargin: false,
};

function WithSeparator(props) {
  const {
    classes,
    className: classNameProp,
    component: Component,
    halfMargin,
    ...rest
  } = props;

  const className = classNames(classes.root, classNameProp, {
    [classes.halfMargin]: halfMargin,
  });

  return <Component className={className} {...rest} />;
}

export default withStyles(styles)(WithSeparator);
