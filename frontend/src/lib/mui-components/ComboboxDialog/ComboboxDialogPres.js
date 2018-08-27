import React from 'react';
import * as Mui from '@material-ui/core';

import * as C from './components';

const styles = theme => ({
  root: {},
  paper: {
    // Copied from material-ui Dialog, but add in height: 100%
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: 48,
    position: 'relative',
    overflowY: 'auto', // Fix IE11 issue, to remove at some point.
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 'none',
  },
  contentFixed: {
    flex: '0 0 auto',
  },
  list: {
    padding: '0px',
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    width: '300px',
  },
});

class ComboboxDialogPres extends React.Component {
  static defaultProps = {
    itemToGroup: item => item && item['group'],
  };

  render() {
    const {
      InputProps,
      classes,
      inputProps,
      listBottomElement,
      onClose,
      open,
      submenuItems,
      title,
      clickedIndex,
      onMoreClick,
      itemToGroup,

      // from comboboxcontroller
      selectedItems,
      multiple,
      onKeyDown,
      suggestion,
      focusIndex,
      downshift,
      downshiftRef,
      isControlledOpen,
      comparator,
      items,
      inputValue,
      onInputValueChange,
      groupIndicies,
      ...rest
    } = this.props;

    return (
      /* eslint-disable react/jsx-no-duplicate-props */
      <React.Fragment>
        <Mui.RootRef rootRef={downshiftRef}>
          <Mui.Dialog
            {...{ open, onClose, classes: { paper: classes.paper }, ...rest }}
          >
            {title && <Mui.DialogTitle>{title}</Mui.DialogTitle>}
            <Mui.DialogContent className={classes.contentFixed}>
              <C.Input
                autoFocus
                className={classes.input}
                downshift={downshift}
                multiple={multiple}
                suggestion={suggestion}
                focusIndex={focusIndex}
                selectedItems={selectedItems}
                onKeyDown={onKeyDown}
                isControlledOpen={isControlledOpen}
                placeholder={'Search...'}
                inputProps={inputProps}
                InputProps={InputProps}
                value={inputValue}
                onChange={event => onInputValueChange(event.target.value)}
              />
            </Mui.DialogContent>
            <Mui.Divider />
            <Mui.DialogContent className={classes.list}>
              <C.ListVirtualized
                items={items}
                comparator={comparator}
                downshift={downshift}
                selectedItems={selectedItems}
                submenuItems={submenuItems}
                clickedIndex={clickedIndex}
                onMoreClick={onMoreClick}
                itemToGroup={itemToGroup}
              />
            </Mui.DialogContent>
            {listBottomElement}
            <Mui.Divider />
            <Mui.DialogActions>
              <Mui.Button onClick={onClose} color="primary">
                Ok
              </Mui.Button>
            </Mui.DialogActions>
          </Mui.Dialog>
        </Mui.RootRef>
      </React.Fragment>
      /* eslint-enable react/jsx-no-duplicate-props */
    );
  }
}

ComboboxDialogPres.defaultProps = {};

export default Mui.withStyles(styles)(ComboboxDialogPres);
