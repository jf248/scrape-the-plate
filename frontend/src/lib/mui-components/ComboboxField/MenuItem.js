import React from 'react';
import classnames from 'classnames';
import { Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
  menuItem: {
    padding: '4px 16px 4px 24px',
  },
  highlighted: {
    backgroundColor: theme.palette.action.hover,
  },
  selected: {
    backgroundColor: theme.palette.action.selected,
  },
});

MenuItem.defaultProps = {
  selectedItems: [],
};

function MenuItem(props) {
  const {
    classes,
    className: classNameProp,
    downshiftProps,
    index,
    item,
    selectedItems, // eslint-disable-line no-unused-vars
    ...rest
  } = props;

  const { getItemProps, highlightedIndex, itemToString } = downshiftProps;

  const className = classnames(
    classes.menuItem,
    { [classes.highlighted]: highlightedIndex === index },
    { [classes.selected]: selectedItems.includes(item)},
    classNameProp
  );

  return (
    <Typography
      {...getItemProps({
        className,
        index,
        item,
        ...rest,
      })}
    >
      {itemToString(item)}
    </Typography>
  );
}

export default withStyles(styles)(MenuItem);
