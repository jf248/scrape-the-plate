import React from 'react';
import classnames from 'classnames';
import * as Mui from '@material-ui/core';

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
    MenuProps: { className: MenuClassName, ...MenuPropsProp },
    SubheaderProps,
    classes,
    downshiftProps,
    groupedItems,
    noMatchProps: { className: noMatchClassName, ...noMatchPropsProp },
    noMatchText,
    selectedItems,
    submenuItems,
  } = props;

  const { isOpen, itemToString } = downshiftProps;

  const renderSublists = () => {
    if (groupedItems.length === 0) {
      return (
        <div
          className={classnames(classes.noMatch, noMatchClassName)}
          {...noMatchPropsProp}
        >
          <Mui.Typography color={'inherit'}>{noMatchText}</Mui.Typography>
        </div>
      );
    } else {
      return groupedItems.map(sublist => {
        const group = sublist.group;
        return (
          <li key={group || 'single-sublist'} className={classes.listSection}>
            <ul className={classes.ul}>
              {group && (
                <Mui.ListSubheader {...SubheaderProps}>
                  {group}
                </Mui.ListSubheader>
              )}
              {sublist.items.map((item, indexOfSublist) => {
                const index = sublist.firstIndex + indexOfSublist;
                const selected = selectedItems.includes(item);
                return (
                  <MenuItem
                    key={itemToString(item)}
                    {...{
                      downshiftProps,
                      index,
                      item,
                      selected,
                      submenuItems,
                    }}
                  />
                );
              })}
            </ul>
          </li>
        );
      });
    }
  };

  const { ref, ...otherMenuProps } = downshiftProps.getMenuProps();

  if (isOpen) {
    return (
      <Mui.RootRef rootRef={ref}>
        <Mui.List
          {...otherMenuProps}
          className={classnames(MenuClassName)}
          {...MenuPropsProp}
        >
          {renderSublists()}
        </Mui.List>
      </Mui.RootRef>
    );
  } else {
    return null;
  }
}

export default Mui.withStyles(styles)(Menu);
