import React from 'react';

import * as PowerPlug from 'lib/react-powerplug';

import ComboboxController from 'lib/mui-components/ComboboxController'; // eslint-disable-line import/no-internal-modules
import ComboboxDialogPres from './ComboboxDialogPres';

CombobDialog.defaultProps = {
  multiple: false,
};

function CombobDialog(props) {
  const {
    itemToString,
    items,
    multiple,
    onChange,
    onClose,
    open,
    selectedItem,
    submenuItems,
    title,
    inputProps,
    InputProps,
    ...rest
  } = props;

  const renderFunc = combobox => {
    const {
      downshiftProps: { getRootProps },
    } = combobox;
    return (
      <ComboboxDialogPres
        {...getRootProps({
          refKey: 'downshiftRef',
          open,
          onClose,
          submenuItems,
          title,
          inputProps,
          InputProps,
          ...combobox,
          ...rest,
        })}
      />
    );
  };

  return (
    /* eslint-disable react/jsx-key */
    <PowerPlug.Compose
      components={[
        <ComboboxController
          {...{
            isOpen: true,
            selectedItem,
            onChange,
            itemToString,
            items,
            multiple,
          }}
        />,
      ]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default CombobDialog;
