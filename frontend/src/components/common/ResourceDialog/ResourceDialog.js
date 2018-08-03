import React from 'react';

import { Compose } from 'lib/react-powerplug';
import * as Crud from 'lib/crud';

import { Modal } from 'controllers/modal';
import { Crud as CrudController } from 'controllers/crud';
import { CONFIRMATION_MODAL } from 'components/frame';

import * as C from './components';
import ResourceDialogPres from './ResourceDialogPres';

ResourceDialog.defaultProps = {
  stringField: 'name',
  editDialogProps: {},
};

function ResourceDialog({
  editDialogContentComponent,
  editDialogProps,
  multiple,
  onChange: onChangeProp,
  resource,
  stringField,
  value: valueProp,
  open,
  onClose,
}) {
  const value = multiple ? (valueProp ? valueProp : []) : valueProp;
  const resourceNameSingular = resource.slice(0, -1);
  const editDialogName = `EDIT_${resource}_DIALOG`;
  const onChange = selectedItem => {
    if (multiple) {
      onChangeProp(selectedItem && selectedItem.map(item => item.id));
    } else {
      onChangeProp(selectedItem && selectedItem.id);
    }
  };
  const itemToString = item => (item === null ? '' : item[stringField]);

  const renderFunc = (
    editResourceDialog,
    confirmationModal,
    crud,
    recordsMany
  ) => {
    const { onOpen: onOpenEdit } = editResourceDialog;
    const { onOpen: onOpenConfirmation } = confirmationModal;
    const { destroy } = crud;
    const { data, ids } = recordsMany;

    const getSelectedItem = () => {
      if (multiple) {
        return value.map(id => data[id]);
      } else {
        return data[value] || null;
      }
    };
    const selectedItem = getSelectedItem();
    const items = ids.map(id => data[id]);
    const onDelete = item =>
      onOpenConfirmation({
        title: `Delete the ${resourceNameSingular}?`,
        onConfirm: () => destroy({ id: item.id }),
      });

    const onEdit = item => onOpenEdit({ id: item.id });

    const onCreate = () => onOpenEdit();

    const editDialog = React.createElement(C.EditResourceDialog, {
      name: editDialogName,
      component: editDialogContentComponent,
      resource,
      ...editDialogProps,
    });

    return (
      <ResourceDialogPres
        {...{
          onClose,
          onCreate,
          onDelete,
          onEdit,
          open,
          itemToString,
          items,
          onChange,
          selectedItem,
          multiple,
          editDialog,
          resourceNameSingular,
        }}
      />
    );
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[
        <Modal name={editDialogName} />,
        <Modal name={CONFIRMATION_MODAL} />,
        <CrudController resource={resource} />,
        <Crud.RecordsMany resource={resource} />,
      ]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default ResourceDialog;
