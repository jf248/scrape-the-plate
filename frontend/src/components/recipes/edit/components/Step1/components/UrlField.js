import React from 'react';
import { TextField } from '@material-ui/core';

import { Link } from 'lib/mui-components';

import { cursorToEnd } from 'utils';

const UrlField = props => {
  const { openSitesModal, value, error, focus, touched, ...rest } = props;

  return (
    <TextField
      autoFocus
      inputProps={{
        onFocus: cursorToEnd,
      }}
      fullWidth
      id={'title'}
      margin={'normal'}
      placeholder={'Enter a recipe URL'}
      value={value}
      error={touched && !!error}
      helperText={[
        touched && error && `${error} `,
        <Link
          tabIndex={-1}
          key={'Link'}
          onFocus={focus}
          onClick={openSitesModal}
        >
          Which sites can I scrape?
        </Link>,
      ]}
      {...rest}
    />
  );
};

export default UrlField;
