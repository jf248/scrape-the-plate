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

SelectResourceDialogPres.defaultProps = {};

function SelectResourceDialogPres({
  className: classNameProp,
  classes,
  editDialog,
  multiple,
  onCreate,
  onDelete,
  onEdit,
  resourceName,
  getSelectedItems,
  selectedItems,
  ...rest
}) {
  const className = classNames(classNameProp, classes.root);

  const title = multiple
    ? `Choose some ${resourceName}s`
    : `Choose a ${resourceName}`;

  return (
    <React.Fragment>
      <Enhanced.ComboboxDialog
        {...{
          selectedItems: getSelectedItems ? getSelectedItems() : selectedItems,
          className,
          listBottomElement: (
            <Mui.DialogActions className={classes.dialogActions}>
              <Mui.Button onClick={onCreate} color="primary">
                {`+ Create a new ${resourceName}`}
              </Mui.Button>
            </Mui.DialogActions>
          ),
          multiple,
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
      />
      {editDialog}
    </React.Fragment>
  );
}

export default Mui.withStyles(styles)(SelectResourceDialogPres);
