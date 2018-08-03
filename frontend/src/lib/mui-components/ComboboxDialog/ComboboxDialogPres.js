import React from 'react';
import * as Mui from '@material-ui/core';

import * as C from './components';

const styles = () => ({
  root: {},
  contentFixed: {
    flex: '0 0 auto',
  },
  menu: {
    padding: '0px',
  },
  input: {
    width: '300px',
  },
});

class ComboboxDialogPres extends React.Component {
  render() {
    const {
      children,
      classes,
      open,
      onClose,
      submenuItems,
      title,
      inputProps,
      InputProps,

      // from comboboxcontroller
      selectedItems,
      multiple,
      onKeyDown,
      typeAheadText,
      selectedItemFocusIndex,
      groupedItems,
      downshiftProps,
      downshiftRef,
      isControlledOpen,

      ...rest
    } = this.props;

    return (
      /* eslint-disable react/jsx-no-duplicate-props */
      <React.Fragment>
        <Mui.RootRef rootRef={downshiftRef}>
          <Mui.Dialog {...{ open, onClose, ...rest }}>
            <Mui.DialogTitle>{title}</Mui.DialogTitle>
            <Mui.DialogContent className={classes.contentFixed}>
              <C.Input
                className={classes.input}
                downshiftProps={downshiftProps}
                multiple={multiple}
                typeAheadText={typeAheadText}
                selectedItemFocusIndex={selectedItemFocusIndex}
                selectedItems={selectedItems}
                onKeyDown={onKeyDown}
                isControlledOpen={isControlledOpen}
                placeholder={'Search...'}
                inputProps={inputProps}
                InputProps={InputProps}
              />
            </Mui.DialogContent>
            <Mui.Divider />
            <Mui.DialogContent className={classes.menu}>
              <C.Menu
                downshiftProps={downshiftProps}
                groupedItems={groupedItems}
                selectedItems={selectedItems}
                submenuItems={submenuItems}
              />
            </Mui.DialogContent>
            {children}
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
