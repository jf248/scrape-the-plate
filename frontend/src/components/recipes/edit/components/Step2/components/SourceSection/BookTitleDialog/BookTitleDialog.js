import React from 'react';

import { Compose } from 'lib/react-powerplug';
import { ComboboxController } from 'lib/mui-components/ComboboxField';

import Modal from 'controllers/Modal';
import { EDIT_BOOK_DIALOG } from 'components/books';
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

  const renderFunc = (editBookDialog, combobox) => {
    const { onOpen: onOpenEdit } = editBookDialog;
    const {
      downshiftProps: { getRootProps },
    } = combobox;
    return (
      <BookTitleDialogPres
        {...{
          open,
          onClose,
          onOpenEdit,
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
        <Modal name={EDIT_BOOK_DIALOG} />,
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
