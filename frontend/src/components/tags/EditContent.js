import React from 'react';

import { Field } from 'components/common';

function EditContent({ getInputProps }) {
  return (
    <Field
      {...getInputProps({ name: 'name', label: 'Tag', autoFocus: true })}
    />
  );
}
export default EditContent;
