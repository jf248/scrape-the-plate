import React from 'react';
import * as Mui from '@material-ui/core';
import Label from '@material-ui/icons/Label';

const styles = () => ({
  root: {},
});

TagListItemPres.defaultProps = {
  record: {},
};

function TagListItemPres({ record, selected, onClick, ...rest }) {
  return (
    <Mui.ListItem
      key={record.id}
      selected={selected}
      button
      dense
      onClick={onClick}
    >
      <Mui.ListItemIcon>
        <Label />
      </Mui.ListItemIcon>
      <Mui.ListItemText primary={record.name} />
    </Mui.ListItem>
  );
}

export default Mui.withStyles(styles)(TagListItemPres);
