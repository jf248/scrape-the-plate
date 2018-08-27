import React from 'react';
import classnames from 'classnames';
import * as Mui from '@material-ui/core';
import * as Virtualized from 'react-virtualized';

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
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  backgroundColor: {
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
      groupIndicies,
      onMoreClick,
      clickedIndex,
    } = this.props;
    const { isOpen, itemToString } = downshift;

    const rowRenderer = ({ index, key, style }) => {
      return groupIndicies.includes(index) ? (
        <Mui.ListSubheader
          style={style}
          class={classes.subheader}
          key={items[index]}
          {...SubheaderProps}
        >
          {`${items[index]}`}
        </Mui.ListSubheader>
      ) : (
        <ListItem
          {...{
            index,
            key: itemToString(items[index]),
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
    };
    const { ref, ...otherListProps } = downshift.getMenuProps();

    const NoMatch = () => (
      <div
        className={classnames(classes.noMatch, noMatchClassName)}
        {...noMatchPropsProp}
      >
        <Mui.Typography color={'inherit'}>{noMatchText}</Mui.Typography>
      </div>
    );

    const StickySubheader = ({ scrollTop }) => {
      const stepFunc = (beg, end) => x => {
        if (x < beg) {
          return 0;
        }
        if (x > end) {
          return 1;
        }
        return (x - beg) / (end - beg);
      };

      const newScrollTop =
        groupIndicies
          .slice(1)
          .map(index => stepFunc(index, index + 1))
          .reduce((acc, f) => acc + f(scrollTop / 48 + 1), 0) * 48;
      return (
        <div style={{ position: 'relative', height: 0, width: '100%' }}>
          <Virtualized.AutoSizer
            style={{ height: 48, position: 'absolute', top: 0, zIndex: 10 }}
          >
            {({ width }) => (
              <Virtualized.List
                {...{
                  style: { overflow: 'hidden' },
                  scrollTop: newScrollTop,
                  height: 48,
                  width: width - 17,
                  rowCount: groupIndicies.length,
                  rowHeight: 48,
                  rowRenderer: ({ index, style }) => (
                    <Mui.ListSubheader
                      key={items[groupIndicies[index]]}
                      style={style}
                      className={classes.backgroundColor}
                      {...SubheaderProps}
                    >
                      {`${items[groupIndicies[index]]}`}
                    </Mui.ListSubheader>
                  ),
                  selectedItems,
                }}
              />
            )}
          </Virtualized.AutoSizer>
        </div>
      );
    };

    if (isOpen) {
      return (
        <Virtualized.ScrollSync>
          {({ onScroll, scrollTop }) => (
            <React.Fragment>
              <StickySubheader {...{ scrollTop }} />
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
                        <Virtualized.List
                          {...{
                            height,
                            width,
                            rowCount: items.length,
                            rowHeight: 48,
                            rowRenderer,
                            selectedItems,
                            onScroll,
                          }}
                        />
                      )}
                    </Virtualized.AutoSizer>
                  )}
                </Mui.List>
              </Mui.RootRef>
            </React.Fragment>
          )}
        </Virtualized.ScrollSync>
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
