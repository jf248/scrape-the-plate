import React from 'react';
import * as Mui from '@material-ui/core';
import * as Crud from 'lib/crud';

import { Field } from 'components/common';

const styles = () => ({
  block: {
    display: 'block',
  },
});

function EditContent({ classes, getInputProps }) {
  return (
    <React.Fragment>
      <Field
        {...getInputProps({
          name: 'name',
          label: 'Name',
          autoFocus: true,
          className: classes.block,
          required: true,
        })}
      />
      <Crud.RecordsMany resource={'groceryGroups'}>
        {({ data, ids }) => (
          <Field
            {...getInputProps({
              name: 'group',
              label: 'Group',
              select: true,
              component: Mui.TextField,
              className: classes.block,
              fullWidth: true,
              formatValue: value => (value ? value.name : ''),
              required: true,
            })}
          >
            {ids.map(id => (
              <Mui.MenuItem key={id} value={data[id]}>
                {data[id].name}
              </Mui.MenuItem>
            ))}
          </Field>
        )}
      </Crud.RecordsMany>
    </React.Fragment>
  );
}
export default Mui.withStyles(styles)(EditContent);
