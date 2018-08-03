import React from 'react';
import classNames from 'classnames';
import * as Mui from '@material-ui/core';

import * as Enhanced from 'lib/mui-components';

const styles = () => ({
  root: {},
  dialogActions: {
    flex: '0 0 auto',
    justifyContent: 'flex-start',
  },
});

ResourceDialogPres.defaultProps = {};

function ResourceDialogPres({
  classes,
  className: classNameProp,
  onClose,
  onCreate,
  onDelete,
  onEdit,
  open,
  itemToString,
  items,
  onChange,
  selectedItem,

  editDialog,
  resourceNameSingular,
  multiple,

  ...rest
}) {
  const className = classNames(classNameProp, classes.root);

  const title = multiple
    ? `Choose some ${resourceNameSingular}s`
    : `Choose a ${resourceNameSingular}`;

  return (
    <React.Fragment>
      <Enhanced.ComboboxDialog
        {...{
          className,
          itemToString,
          items,
          multiple,
          onChange,
          onClose,
          open,
          selectedItem,
          submenuItems: [
            (item, selected) => (
              <Mui.MenuItem
                key={'edit'}
                disabled={selected}
                onClick={() => onEdit(item)}
              >
                {'Edit'}
              </Mui.MenuItem>
            ),
            (item, selected) => (
              <Mui.MenuItem
                key={'delete'}
                disabled={selected}
                onClick={() => onDelete(item)}
              >
                {'Delete'}
              </Mui.MenuItem>
            ),
          ],
          title,
          ...rest,
        }}
      >
        <Mui.DialogActions className={classes.dialogActions}>
          <Mui.Button onClick={onCreate} color="primary">
            {`+ Create a new ${resourceNameSingular}`}
          </Mui.Button>
        </Mui.DialogActions>
      </Enhanced.ComboboxDialog>
      {editDialog}
    </React.Fragment>
  );
}

export default Mui.withStyles(styles)(ResourceDialogPres);
