import React, { Fragment, cloneElement } from 'react';
import { Divider, withStyles } from '@material-ui/core';
import classnames from 'classnames';

const styles = () => ({
  listBottom: {
    display: 'block',
    lineHeight: '16px',
    padding: '8px 16px 8px 24px',
  },
});

function MenuBottom(props) {
  const { classes, className, menuBottomElement } = props;
  if (!menuBottomElement) {
    return null;
  }
  return (
    <Fragment>
      <Divider />
      {cloneElement(menuBottomElement, {
        className: classnames(classes.listBottom, className),
      })}
    </Fragment>
  );
}

export default withStyles(styles)(MenuBottom);
