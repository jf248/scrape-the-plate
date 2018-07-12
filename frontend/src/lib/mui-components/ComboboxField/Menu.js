import React from 'react';
import classnames from 'classnames';
import {
  Typography,
  Divider,
  Paper,
  ListSubheader,
  withStyles,
} from '@material-ui/core';

import MenuBottom from './MenuBottom';
import MenuItem from './MenuItem';

const styles = theme => ({
  paper: {
    zIndex: theme.zIndex.modal,
  },
  listContainer: {
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 32px)',
    backgroundColor: 'inherit',
  },
  noMatch: {
    padding: '8px 16px 8px 24px',
    fontStyle: 'italic',
    color: theme.palette.text.disabled,
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
    menuBottomElement,
    menuBottomFixed,
    MenuProps: { className: MenuClassName, ...MenuPropsProp },
    noMatchProps: { className: noMatchClassName, ...noMatchPropsProp },
    noMatchText,
    renderMenuItem,
    selectedItems,
    SubheaderProps,
  } = props;

  const { isOpen, itemToString } = downshiftProps;

  const renderMenuItems = sublist =>
    sublist.items.map((item, indexOfSublist) => {
      const index = sublist.firstIndex + indexOfSublist;
      const renderFunc =
        renderMenuItem || (props => React.createElement(MenuItem, props)); // eslint-disable-line react/display-name
      return renderFunc({
        downshiftProps,
        index,
        item,
        key: itemToString(item),
        selectedItems,
      });
    });

  const renderSublists = () => {
    const last = groupedItems.length - 1;
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
      return groupedItems.map((sublist, index) => {
        const group = sublist.group;
        return (
          <React.Fragment key={group || 'single-sublist'}>
            <ListSubheader {...SubheaderProps}>{group}</ListSubheader>
            {renderMenuItems(sublist)}
            {index < last && <Divider />}
          </React.Fragment>
        );
      });
    }
  };

  if (isOpen) {
    return (
      <Paper className={classes.paper}>
        <div
          {...downshiftProps.getMenuProps()}
          className={classnames(classes.listContainer, MenuClassName)}
          {...MenuPropsProp}
        >
          {renderSublists()}
          {!menuBottomFixed && (
            <MenuBottom menuBottomElement={menuBottomElement} />
          )}
        </div>
        {menuBottomFixed && (
          <MenuBottom menuBottomElement={menuBottomElement} />
        )}
      </Paper>
    );
  } else {
    return null;
  }
}

export default withStyles(styles)(Menu);
