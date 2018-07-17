import React from 'react';

import { Link, TextField } from 'lib/mui-components';

import { cursorToEnd } from 'utils';

const UrlField = props => {
  const { openSitesModal, error, focus, touched, ...rest } = props;

  return (
    <TextField
      autoFocus
      inputProps={{
        onFocus: cursorToEnd,
      }}
      fullWidth
      placeholder={'Enter a recipe URL'}
      error={touched && !!error}
      margin={'normal'}
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
