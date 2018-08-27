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
    downshift,
    items,
    groupIndicies,
    listBottomElement,
    listBottomFixed,
    ListProps: { className: ListClassName, ...ListPropsProp },
    noMatchProps: { className: noMatchClassName, ...noMatchPropsProp },
    noMatchText,
    selectedItems,
    SubheaderProps,
  } = props;

  const { isOpen, itemToString } = downshift;

  const NoMatch = () => (
    <div
      className={classnames(classes.noMatch, noMatchClassName)}
      {...noMatchPropsProp}
    >
      <Typography color={'inherit'}>{noMatchText}</Typography>
    </div>
  );

  const ListItems = () =>
    items.map((item, index) => {
      if (groupIndicies.includes(index)) {
        return (
          <React.Fragment key={item}>
            {index !== 0 && <Divider />}
            <ListSubheader {...SubheaderProps}>{item}</ListSubheader>
          </React.Fragment>
        );
      }

      return (
        <ListItem
          {...{
            index,
            key: itemToString(item),
            item,
            downshift,
            selectedItems,
          }}
        />
      );
    });

  if (isOpen) {
    return (
      <Paper className={classes.paper}>
        <div
          {...downshift.getListProps()}
          className={classnames(classes.listContainer, ListClassName)}
          {...ListPropsProp}
        >
          {items.length === 0 ? <NoMatch /> : <ListItems />}
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
