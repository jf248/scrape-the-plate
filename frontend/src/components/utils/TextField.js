import React from 'react';

import { TextField as MuiTextField } from 'lib/mui-components';

function TextField({ error, touched, ...rest }) {
  return (
    <MuiTextField
      helperText={touched && error}
      error={touched && !!error}
      margin="dense"
      {...rest}
    />
  );
}

export default TextField;
