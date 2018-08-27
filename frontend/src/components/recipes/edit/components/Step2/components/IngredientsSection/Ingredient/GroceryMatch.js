import React from 'react';
import classNames from 'classnames';
import * as Mui from '@material-ui/core';

import * as MuiC from 'lib/mui-components';

const styles = () => ({
  root: {},
});

GroceryMatch.defaultProps = {};

function GroceryMatch(props) {
  const {
    classes,
    className: classNameProp,
    item,
    ingredientText,
    onChangeGroceryClick,
    ...rest
  } = props;

  if (!ingredientText) {
    return null;
  }

  const className = classNames(classes.root, classNameProp);
  if (item) {
    return (
      <Mui.Typography variant="caption" className={className} {...rest}>
        <span>
          Matched to: <b>{item.name}</b>{' '}
        </span>
        <MuiC.Link onClick={onChangeGroceryClick}>Change</MuiC.Link>
      </Mui.Typography>
    );
  } else {
    return (
      <Mui.Typography variant="caption" className={className} {...rest}>
        <span>No grocery item matched. </span>
        <MuiC.Link onClick={onChangeGroceryClick}>Choose</MuiC.Link>
      </Mui.Typography>
    );
  }
}

export default Mui.withStyles(styles)(GroceryMatch);
