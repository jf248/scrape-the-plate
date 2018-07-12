import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';

import Input from './Input';
import Menu from './Menu';

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
      menuBottomElement,
      menuBottomFixed,
      MenuProps,
      noMatchProps,
      noMatchText,
      renderMenuItem,
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
        />
        <Menu
          downshiftProps={downshiftProps}
          groupedItems={groupedItems}
          menuBottomElement={menuBottomElement}
          menuBottomFixed={menuBottomFixed}
          MenuProps={MenuProps}
          noMatchProps={noMatchProps}
          noMatchText={noMatchText}
          renderMenuItem={renderMenuItem}
          selectedItems={selectedItems}
          SubheaderProps={SubheaderProps}
        />
      </div>
    );
  }
}

ComboboxFieldPres.defaultProps = {};

export default withStyles(styles)(ComboboxFieldPres);
