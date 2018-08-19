import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';

import { Input, List } from './components';

const styles = () => ({
  root: {
    position: 'relative',
    display: 'inline-block',
  },
});

class ComboboxFieldPres extends React.Component {
  render() {
    const {
      classes,
      className: classNameProp,
      listBottomElement,
      listBottomFixed,
      ListProps,
      noMatchProps,
      noMatchText,
      renderListItem,
      renderSelectedItem,
      SubheaderProps,
      TextFieldProps,

      // from controller
      selectedItems,
      multiple,
      onKeyDown,
      typeAheadText,
      selectedItemFocusIndex,
      groupedItems,
      downshiftProps,
      isControlledOpen,
      innerRef,
      ...rest
    } = this.props;

    const className = classNames(classes.root, classNameProp);

    return (
      <div ref={innerRef} className={className} {...rest}>
        <Input
          downshiftProps={downshiftProps}
          multiple={multiple}
          renderSelectedItem={renderSelectedItem}
          typeAheadText={typeAheadText}
          selectedItemFocusIndex={selectedItemFocusIndex}
          selectedItems={selectedItems}
          {...TextFieldProps}
          onKeyDown={onKeyDown}
          isControlledOpen={isControlledOpen}
        />
        <List
          downshiftProps={downshiftProps}
          groupedItems={groupedItems}
          listBottomElement={listBottomElement}
          listBottomFixed={listBottomFixed}
          ListProps={ListProps}
          noMatchProps={noMatchProps}
          noMatchText={noMatchText}
          renderListItem={renderListItem}
          selectedItems={selectedItems}
          SubheaderProps={SubheaderProps}
        />
      </div>
    );
  }
}

ComboboxFieldPres.defaultProps = {};

export default withStyles(styles)(ComboboxFieldPres);
