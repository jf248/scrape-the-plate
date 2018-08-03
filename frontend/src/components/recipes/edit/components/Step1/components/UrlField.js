import React from 'react';

import { Link } from 'lib/mui-components';

import { Field } from 'components/common';
import { cursorToEnd } from 'utils';

const UrlField = props => {
  const { onOpenModal, error, focus, touched, ...rest } = props;

  return (
    <Field
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
        <Link tabIndex={-1} key={'Link'} onFocus={focus} onClick={onOpenModal}>
          Which sites can I scrape?
        </Link>,
      ]}
      {...rest}
    />
  );
};

export default UrlField;
