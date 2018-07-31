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

import { ComboboxInput } from 'lib/mui-components';
import { ComboboxMenu } from 'components/common';
import EditBookDialog from './EditBookDialog';

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

class BookDialogPres extends React.Component {
  render() {
    const {
      classes,
      onClose,
      onCreate,
      onDelete,
      onEdit,
      open,

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
              <ComboboxInput
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
              <ComboboxMenu
                downshiftProps={downshiftProps}
                groupedItems={groupedItems}
                selectedItems={selectedItems}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </DialogContent>
            <DialogActions
              className={classNames(classes.editAction, classes.contentFixed)}
            >
              <Button onClick={onCreate} color="primary">
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

BookDialogPres.defaultProps = {};

export default withStyles(styles)(BookDialogPres);
