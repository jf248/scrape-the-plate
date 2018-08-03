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

MenuItem.defaultProps = {
  submenuItems: [],
};

function MenuItem(props) {
  const {
    children,
    className: classNameProp,
    classes,
    downshiftProps,
    index,
    item,
    selected,
    submenuItems,
    ...rest
  } = props;

  const { getItemProps, highlightedIndex, itemToString } = downshiftProps;

  const className = classnames(
    { [classes.highlighted]: highlightedIndex === index },
    { [classes.selected]: selected },
    classNameProp
  );

  return (
    <Mui.ListItem
      {...getItemProps({
        className,
        index,
        item,
        button: true,
        ...rest,
      })}
    >
      <Mui.ListItemText>{itemToString(item)}</Mui.ListItemText>
      {submenuItems.length > 0 && (
        <Mui.ListItemSecondaryAction>
          <Enhanced.MoreButton>
            {submenuItems.map(submenuItem => submenuItem(item, selected))}
          </Enhanced.MoreButton>
        </Mui.ListItemSecondaryAction>
      )}
    </Mui.ListItem>
  );
}

export default Mui.withStyles(styles)(MenuItem);
