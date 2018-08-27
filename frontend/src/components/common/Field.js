import React from 'react';

import * as Enhanced from 'lib/mui-components';
import * as utils from 'utils';

Field.defaultProps = {
  component: Enhanced.TextField,
};

function Field({
  error: errorProp,
  touched,
  component: Component,
  formatValue,
  value: valueProp,
  ...rest
}) {
  // Check error is not an object
  const error = utils.isObject(errorProp) ? undefined : errorProp;
  const value = formatValue ? formatValue(valueProp) : valueProp;

  return (
    <Component
      helperText={touched && error}
      error={touched && !!error}
      margin="dense"
      value={value}
      {...rest}
    />
  );
}

export default Field;
