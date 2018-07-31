import React from 'react';

import { Compose } from 'lib/react-powerplug';
import { ComboboxController } from 'lib/mui-components';

import { Modal } from 'controllers/modal';
import { Crud } from 'controllers/crud';
import { EDIT_BOOK_DIALOG } from './names';
import { CONFIRMATION_MODAL } from 'components/frame';
import BookDialogPres from './BookDialogPres';

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

  const renderFunc = (editBookDialog, confirmationModal, crud, combobox) => {
    const { onOpen: onOpenEdit } = editBookDialog;
    const { onOpen: onOpenConfirmation } = confirmationModal;
    const {
      downshiftProps: { getRootProps },
    } = combobox;
    const { destroy } = crud;

    const onDelete = item =>
      onOpenConfirmation({
        title: 'Delete the book?',
        onConfirm: () => destroy({ id: item.id }),
      });

    const onEdit = item => onOpenEdit({ id: item.id });

    const onCreate = () => onOpenEdit();

    return (
      <BookDialogPres
        {...{
          onClose,
          onDelete,
          onEdit,
          onCreate,
          open,
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
        <Modal name={CONFIRMATION_MODAL} />,
        <Crud resource={'books'} />,
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
