import React from 'react';
import classnames from 'classnames';
import * as Mui from '@material-ui/core';

import ListItem from './ListItem';

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

List.defaultProps = {
  noMatchProps: {},
  noMatchText: 'No matches...',
  menuBottomFixed: true,
  ListProps: {},
  selectedItems: [],
};

function List(props) {
  const {
    ListProps: { className: ListClassName, ...ListPropsProp },
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
                  <ListItem
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

  const { ref, ...otherListProps } = downshiftProps.getMenuProps();

  if (isOpen) {
    return (
      <Mui.RootRef rootRef={ref}>
        <Mui.List
          {...otherListProps}
          className={classnames(ListClassName)}
          {...ListPropsProp}
        >
          {renderSublists()}
        </Mui.List>
      </Mui.RootRef>
    );
  } else {
    return null;
  }
}

export default Mui.withStyles(styles)(List);
