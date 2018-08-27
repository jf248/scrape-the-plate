import React from 'react';
import classnames from 'classnames';
import { Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
  listItem: {
    padding: '4px 16px 4px 24px',
  },
  highlighted: {
    backgroundColor: theme.palette.action.hover,
  },
  selected: {
    backgroundColor: theme.palette.action.selected,
  },
});

ListItem.defaultProps = {
  selectedItems: [],
};

function ListItem(props) {
  const {
    classes,
    className: classNameProp,
    comparator,
    downshift,
    index,
    item,
    selectedItems, // eslint-disable-line no-unused-vars
    ...rest
  } = props;

  const { getItemProps, highlightedIndex, itemToString } = downshift;

  const className = classnames(
    classes.listItem,
    { [classes.highlighted]: highlightedIndex === index },
    {
      [classes.selected]: selectedItems.some(selectedItem =>
        comparator(item, selectedItem)
      ),
    },
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

export default withStyles(styles)(ListItem);
