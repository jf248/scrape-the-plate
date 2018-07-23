import React from 'react';
import classNames from 'classnames';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  RootRef,
  Divider,
  withStyles,
} from '@material-ui/core';

import Input from 'lib/mui-components/ComboboxField/Input';
import Menu from 'components/utils/ComboboxField/Menu';
import { EditBookDialog } from 'components/books';

const styles = () => ({
  root: {},
  contentFixed: {
    flex: '0 0 auto',
  },
  editAction: {
    justifyContent: 'flex-start',
  },
  menu: {
    padding: '0px',
  },
});

class BookTitleDialogPres extends React.Component {
  render() {
    const {
      classes,
      open,
      onClose,
      onOpenEdit,

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
      <React.Fragment>
        <RootRef rootRef={downshiftRef}>
          <Dialog {...{ open, onClose, ...rest }}>
            <DialogTitle>{'Choose a book title'}</DialogTitle>
            <DialogContent className={classes.contentFixed}>
              <Input
                downshiftProps={downshiftProps}
                multiple={multiple}
                typeAheadText={typeAheadText}
                selectedItemFocusIndex={selectedItemFocusIndex}
                selectedItems={selectedItems}
                onKeyDown={onKeyDown}
                isControlledOpen={isControlledOpen}
                placeholder={'Search...'}
              />
            </DialogContent>
            <Divider />

            <DialogContent className={classes.menu}>
              <Menu
                downshiftProps={downshiftProps}
                groupedItems={groupedItems}
                selectedItems={selectedItems}
              />
            </DialogContent>
            <DialogActions
              className={classNames(classes.editAction, classes.contentFixed)}
            >
              <Button onClick={() => onOpenEdit()} color="primary">
                {'+ Add a book'}
              </Button>
            </DialogActions>
            <Divider />
            <DialogActions>
              <Button onClick={onClose} color="primary">
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </RootRef>
        <EditBookDialog />
      </React.Fragment>
    );
  }
}

BookTitleDialogPres.defaultProps = {};

export default withStyles(styles)(BookTitleDialogPres);
