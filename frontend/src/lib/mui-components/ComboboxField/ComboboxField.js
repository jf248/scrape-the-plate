import React from 'react';

import ComboboxFieldPres from './ComboboxFieldPres';
import ComboboxWithFilterController from 'lib/mui-components/ComboboxWithFilterController'; // eslint-disable-line import/no-internal-modules

function ComboboxField(props) {
  const {
    className,
    menuBottomElement,
    menuBottomFixed,
    MenuProps,
    noMatchProps,
    noMatchText,
    renderMenuItem,
    renderSelectedItem,
    style,
    SubheaderProps,
    TextFieldProps,
    suggestion,
    ...rest
  } = props;

  const renderFunc = combobox => {
    return (
      <ComboboxFieldPres
        {...{
          ...combobox.downshift.getRootProps({ refKey: 'innerRef' }),
          className,
          menuBottomElement,
          menuBottomFixed,
          MenuProps,
          noMatchProps,
          noMatchText,
          renderMenuItem,
          renderSelectedItem,
          style,
          suggestion,
          SubheaderProps,
          TextFieldProps,
          ...combobox,
        }}
      />
    );
  };

  return <ComboboxWithFilterController {...rest} render={renderFunc} />;
}

export default ComboboxField;
