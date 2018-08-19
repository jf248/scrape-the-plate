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

function ListBottom(props) {
  const { classes, className, listBottomElement } = props;
  if (!listBottomElement) {
    return null;
  }
  return (
    <Fragment>
      <Divider />
      {cloneElement(listBottomElement, {
        className: classnames(classes.listBottom, className),
      })}
    </Fragment>
  );
}

export default withStyles(styles)(ListBottom);
