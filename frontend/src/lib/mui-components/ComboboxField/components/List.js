import React from 'react';
import classnames from 'classnames';
import {
  Typography,
  Divider,
  Paper,
  ListSubheader,
  withStyles,
} from '@material-ui/core';

import ListBottom from './ListBottom';
import ListItem from './ListItem';

const styles = theme => ({
  paper: {
    zIndex: theme.zIndex.modal,
    position: 'absolute',
    left: 0,
    right: 0,
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

List.defaultProps = {
  noMatchProps: {},
  noMatchText: 'No matches...',
  listBottomFixed: true,
  ListProps: {},
  selectedItems: [],
};

function List(props) {
  const {
    classes,
    downshiftProps,
    groupedItems,
    listBottomElement,
    listBottomFixed,
    ListProps: { className: ListClassName, ...ListPropsProp },
    noMatchProps: { className: noMatchClassName, ...noMatchPropsProp },
    noMatchText,
    renderListItem,
    selectedItems,
    SubheaderProps,
  } = props;

  const { isOpen, itemToString } = downshiftProps;

  const renderListItems = sublist =>
    sublist.items.map((item, indexOfSublist) => {
      const index = sublist.firstIndex + indexOfSublist;
      const renderFunc =
        renderListItem || (props => React.createElement(ListItem, props)); // eslint-disable-line react/display-name
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
            {renderListItems(sublist)}
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
          {...downshiftProps.getListProps()}
          className={classnames(classes.listContainer, ListClassName)}
          {...ListPropsProp}
        >
          {renderSublists()}
          {!listBottomFixed && (
            <ListBottom listBottomElement={listBottomElement} />
          )}
        </div>
        {listBottomFixed && (
          <ListBottom listBottomElement={listBottomElement} />
        )}
      </Paper>
    );
  } else {
    return null;
  }
}

export default withStyles(styles)(List);
