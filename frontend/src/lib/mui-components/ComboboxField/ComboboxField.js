import React from 'react';

import ComboboxFieldPres from './ComboboxFieldPres';
import ComboboxController from 'lib/mui-components/ComboboxController'; // eslint-disable-line import/no-internal-modules

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
    ...rest
  } = props;

  const renderFunc = combobox => {
    return (
      <ComboboxFieldPres
        {...{
          ...combobox.downshiftProps.getRootProps({ refKey: 'innerRef' }),
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
          ...combobox,
        }}
      />
    );
  };

  return <ComboboxController {...rest} render={renderFunc} />;
}

export default ComboboxField;
