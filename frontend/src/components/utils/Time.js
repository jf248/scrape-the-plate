import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';

import { formatMins } from 'utils';

const styles = () => ({
  root: {},
});

Time.defaultProps = {
  component: 'span',
};

function Time(props) {
  const {
    classes,
    className: classNameProp,
    component: Component,
    time,
    ...rest
  } = props;

  const className = classNames(classes.root, classNameProp);

  return (
    <Component className={className} {...rest}>
      {time && formatMins(time)}
    </Component>
  );
}

export default withStyles(styles)(Time);
