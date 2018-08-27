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
      downshift,
      focusIndex,
      items,
      groupIndicies,
      innerRef,
      isControlledOpen,
      suggestion,
      multiple,
      onKeyDown,
      selectedItems,
      comparator,
      ...rest
    } = this.props;

    const className = classNames(classes.root, classNameProp);

    return (
      <div ref={innerRef} className={className} {...rest}>
        <Input
          downshift={downshift}
          multiple={multiple}
          renderSelectedItem={renderSelectedItem}
          suggestion={suggestion}
          focusIndex={focusIndex}
          selectedItems={selectedItems}
          {...TextFieldProps}
          onKeyDown={onKeyDown}
          isControlledOpen={isControlledOpen}
        />
        <List
          comparator={comparator}
          downshift={downshift}
          items={items}
          groupIndicies={groupIndicies}
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
