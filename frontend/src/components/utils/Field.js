import React from 'react';

import { TextField } from 'lib/mui-components';

Field.defaultProps = {
  component: TextField,
};

function Field({ error, touched, component: Component, ...rest }) {
  return (
    <Component
      helperText={touched && error}
      error={touched && !!error}
      margin="dense"
      {...rest}
    />
  );
}

export default Field;
