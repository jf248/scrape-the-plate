import React from 'react';
import * as Virtualized from 'react-virtualized';

class StickyList extends React.PureComponent {
  static defaultProps = {
    itemToGroup: item => item && item['group'],
    wrapperStyle: {},
  };

  getGroupedItems = (items, itemToGroup) => {
    let newIndex = 0;
    const itemsAndGroups = [];
    const groupIndicies = [];
    const itemsMap = {};
    items.forEach((el, i) => {
      if (
        itemToGroup(el) &&
        itemToGroup(el) !== itemToGroup(items[i - 1] || null)
      ) {
        groupIndicies.push(newIndex);
        itemsAndGroups.push(itemToGroup(el));
        newIndex++;
      }
      itemsAndGroups.push(el);
      itemsMap[newIndex] = i;
      newIndex++;
    });

    return [itemsAndGroups, groupIndicies, itemsMap];
  };

  stepFunc = (beg, end) => x => {
    if (x < beg) {
      return 0;
    }
    if (x > end) {
      return 1;
    }
    return (x - beg) / (end - beg);
  };

  getLabelScrollTop = (mainScrollTop, groupIndicies) => {
    return (
      groupIndicies
        .slice(1)
        .map(index => this.stepFunc(index, index + 1))
        .reduce(
          (acc, f) => acc + f(mainScrollTop / this.props.rowHeight + 1),
          0
        ) * this.props.rowHeight
    );
  };

  render() {
    const {
      height,
      itemToGroup,
      items,
      labelRenderer,
      rowHeight,
      rowRenderer: rowRendererProp,
      width,
      wrapperStyle,
      ...rest
    } = this.props;

    const [itemsAndGroups, groupIndicies, itemsMap] = this.getGroupedItems(
      items,
      itemToGroup
    );

    const rowRenderer = ({ index, ...other }) => {
      if (groupIndicies.includes(index)) {
        let label = itemsAndGroups[index];
        return labelRenderer({ label, ...other });
      }
      const oldIndex = itemsMap[index];
      return rowRendererProp({ index: oldIndex, ...other });
    };

    // No groups, default to basic `Virtualized.List`
    if (groupIndicies.length === 0) {
      return (
        <Virtualized.List
          {...{
            ...rest,
            height,
            width,
            rowCount: itemsAndGroups.length,
            rowHeight,
            rowRenderer,
          }}
        />
      );
    }

    return (
      <Virtualized.ScrollSync>
        {({ onScroll, scrollTop }) => (
          <div style={{ ...wrapperStyle, position: 'relative', width, height }}>
            <Virtualized.List
              {...{
                style: { position: 'absolute', zIndex: 10, overflow: 'hidden' },
                width: width - 17,
                height: rowHeight,
                scrollTop: this.getLabelScrollTop(scrollTop, groupIndicies),
                rowHeight,
                rowCount: groupIndicies.length,
                rowRenderer: ({ index, ...other }) =>
                  labelRenderer({
                    label: itemsAndGroups[groupIndicies[index]],
                    ...other,
                  }),
              }}
            />
            <Virtualized.List
              {...{
                ...rest,
                height,
                width,
                rowCount: itemsAndGroups.length,
                rowHeight,
                rowRenderer,
                onScroll,
              }}
            />
          </div>
        )}
      </Virtualized.ScrollSync>
    );
  }
}

export default StickyList;
