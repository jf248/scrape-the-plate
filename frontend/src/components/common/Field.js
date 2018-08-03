import React from 'react';

import * as Enhanced from 'lib/mui-components';
import * as utils from 'utils';

Field.defaultProps = {
  component: Enhanced.TextField,
};

function Field({ error: errorProp, touched, component: Component, ...rest }) {
  // Check error is not an object
  const error = utils.isObject(errorProp) ? undefined : errorProp;

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
