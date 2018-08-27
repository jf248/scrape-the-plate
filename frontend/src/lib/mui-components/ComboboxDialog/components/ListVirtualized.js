import React from 'react';
import classnames from 'classnames';
import * as Mui from '@material-ui/core';
import * as Virtualized from 'react-virtualized';

import StickyList from 'lib/react-virtualized-sticky-list';

import ListItem from './ListItem';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    flex: '1 0 auto',
    height: '100%',
    paddingTop: 0,
  },
  noMatch: {
    padding: '8px 16px 8px 24px',
    fontStyle: 'italic',
    color: theme.palette.text.disabled,
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
});

class List extends React.Component {
  render() {
    const {
      ListProps: { className: ListClassName, ...ListPropsProp },
      SubheaderProps,
      classes,
      comparator,
      downshift,
      noMatchProps: { className: noMatchClassName, ...noMatchPropsProp },
      noMatchText,
      selectedItems,
      submenuItems,
      items,
      itemToGroup,
      onMoreClick,
      clickedIndex,
    } = this.props;
    const { isOpen } = downshift;

    const labelRenderer = ({ label, style, key }) => (
      <Mui.ListSubheader
        style={style}
        className={classes.subheader}
        key={key}
        {...SubheaderProps}
      >
        {label}
      </Mui.ListSubheader>
    );

    const rowRenderer = ({ index, style, key }) => (
      <ListItem
        {...{
          index,
          key,
          item: items[index],
          selected: selectedItems.some(selectedItem =>
            comparator(items[index], selectedItem)
          ),
          downshift,
          style,
          clickedIndex,
          onMoreClick,
          submenuItems,
        }}
      />
    );

    const { ref, ...otherListProps } = downshift.getMenuProps();

    const NoMatch = () => (
      <div
        className={classnames(classes.noMatch, noMatchClassName)}
        {...noMatchPropsProp}
      >
        <Mui.Typography color={'inherit'}>{noMatchText}</Mui.Typography>
      </div>
    );

    if (isOpen) {
      return (
        <React.Fragment>
          <Mui.RootRef rootRef={ref}>
            <Mui.List
              {...otherListProps}
              className={classnames(classes.root, ListClassName)}
              {...ListPropsProp}
            >
              {items.length === 0 ? (
                <NoMatch />
              ) : (
                <Virtualized.AutoSizer>
                  {({ width, height }) => (
                    <StickyList
                      {...{
                        items,
                        height,
                        width,
                        rowHeight: 48,
                        rowRenderer,
                        labelRenderer,
                        selectedItems,
                        itemToGroup,
                      }}
                    />
                  )}
                </Virtualized.AutoSizer>
              )}
            </Mui.List>
          </Mui.RootRef>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}

List.defaultProps = {
  noMatchProps: {},
  noMatchText: 'No matches...',
  menuBottomFixed: true,
  ListProps: {},
  selectedItems: [],
};

export default Mui.withStyles(styles)(List);
