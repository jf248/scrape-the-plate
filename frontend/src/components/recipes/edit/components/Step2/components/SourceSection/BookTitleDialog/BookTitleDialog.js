import React from 'react';

import { Compose, Toggle } from 'lib/react-powerplug';
import { ComboboxController } from 'lib/mui-components/ComboboxField';

import BookTitleDialogPres from './BookTitleDialogPres';

BookTitleDialog.defaultProps = {
  data: {},
  ids: [],
};

function BookTitleDialog(props) {
  const { onChange: onChangeProp, open, onClose, ids, data, value } = props;

  const selectedItem = data[value] || null;
  const onChange = selectedItem => {
    onChangeProp(selectedItem && selectedItem.id);
  };

  const itemToString = item => (item === null ? '' : item.title);

  const items = ids.map(id => data[id]);

  const renderFunc = (toggle, combobox) => {
    const {
      on: isEditOpen,
      switchOn: onOpenEdit,
      switchOff: onCloseEdit,
    } = toggle;
    const {
      downshiftProps: { getRootProps },
    } = combobox;
    return (
      <BookTitleDialogPres
        {...{
          open,
          onClose,
          isEditOpen,
          onOpenEdit,
          onCloseEdit,
          ...getRootProps({ refKey: 'downshiftRef' }),
          ...combobox,
        }}
      />
    );
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[
        <Toggle />,
        <ComboboxController
          {...{ isOpen: true, selectedItem, onChange, itemToString, items }}
        />,
      ]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default BookTitleDialog;
