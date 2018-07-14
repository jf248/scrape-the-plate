import React from 'react';
import classnames from 'classnames';
import { Typography, List, ListSubheader, withStyles } from '@material-ui/core';

import MenuItem from './MenuItem';

const styles = theme => ({
  noMatch: {
    padding: '8px 16px 8px 24px',
    fontStyle: 'italic',
    color: theme.palette.text.disabled,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
});

Menu.defaultProps = {
  noMatchProps: {},
  noMatchText: 'No matches...',
  menuBottomFixed: true,
  MenuProps: {},
  selectedItems: [],
};

function Menu(props) {
  const {
    classes,
    downshiftProps,
    groupedItems,
    menuBottomElement, // eslint-disable-line no-unused-vars
    menuBottomFixed, // eslint-disable-line no-unused-vars
    MenuProps: { className: MenuClassName, ...MenuPropsProp },
    noMatchProps: { className: noMatchClassName, ...noMatchPropsProp },
    noMatchText,
    renderMenuItem, // eslint-disable-line no-unused-vars
    selectedItems,
    SubheaderProps,
  } = props;

  const { isOpen, itemToString } = downshiftProps;

  const renderSublists = () => {
    if (groupedItems.length === 0) {
      return (
        <div
          className={classnames(classes.noMatch, noMatchClassName)}
          {...noMatchPropsProp}
        >
          <Typography color={'inherit'}>{noMatchText}</Typography>
        </div>
      );
    } else {
      return groupedItems.map(sublist => {
        const group = sublist.group;
        return (
          <li key={group || 'single-sublist'} className={classes.listSection}>
            <ul className={classes.ul}>
              {group && (
                <ListSubheader {...SubheaderProps}>{group}</ListSubheader>
              )}
              {sublist.items.map((item, indexOfSublist) => {
                const index = sublist.firstIndex + indexOfSublist;
                return (
                  <MenuItem
                    key={itemToString(item)}
                    {...{ downshiftProps, index, item, selectedItems }}
                  />
                );
              })}
            </ul>
          </li>
        );
      });
    }
  };

  if (isOpen) {
    return (
      <List
        {...downshiftProps.getMenuProps()}
        className={classnames(MenuClassName)}
        {...MenuPropsProp}
      >
        {renderSublists()}
      </List>
    );
  } else {
    return null;
  }
}

export default withStyles(styles)(Menu);
