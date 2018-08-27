import React from 'react';
import classnames from 'classnames';
import * as Mui from '@material-ui/core';

import * as Enhanced from 'lib/mui-components';

const styles = theme => ({
  highlighted: {
    backgroundColor: theme.palette.action.hover,
  },
  selected: {
    backgroundColor: theme.palette.action.selected,
  },
});

ListItem.defaultProps = {
  submenuItems: [],
};

function ListItem(props) {
  const {
    children,
    className: classNameProp,
    classes,
    downshift,
    index,
    item,
    selected,
    submenuItems,
    style,
    clickedIndex,
    onMoreClick,
    ...rest
  } = props;

  const { getItemProps, highlightedIndex, itemToString } = downshift;

  const className = classnames(
    { [classes.highlighted]: highlightedIndex === index },
    { [classes.selected]: selected },
    classNameProp
  );

  return (
    <div style={style}>
      <Mui.ListItem
        {...getItemProps({
          className,
          index,
          item,
          button: true,
          ...rest,
        })}
      >
        <Mui.ListItemText primary={itemToString(item)} />
        {submenuItems.length > 0 &&
          (highlightedIndex === index || clickedIndex === index) && (
            <Mui.ListItemSecondaryAction onClick={onMoreClick(index)}>
              <Enhanced.MoreButton onExit={onMoreClick()}>
                {submenuItems.map(submenuItem => submenuItem(item, selected))}
              </Enhanced.MoreButton>
            </Mui.ListItemSecondaryAction>
          )}
      </Mui.ListItem>
    </div>
  );
}

export default Mui.withStyles(styles)(ListItem);
