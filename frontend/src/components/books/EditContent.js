import React from 'react';

import { Field } from 'components/common';

function EditContent({ getInputProps }) {
  return (
    <Field
      {...getInputProps({
        name: 'title',
        label: 'Title',
        autoFocus: true,
        required: true,
      })}
    />
  );
}
export default EditContent;
