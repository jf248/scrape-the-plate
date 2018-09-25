import React from 'react';

import { Compose } from 'lib/react-powerplug';
import * as Crud from 'lib/crud';

import { Modal } from 'controllers/modal';
import { Crud as CrudController } from 'controllers/crud';
import { CONFIRMATION_MODAL } from 'components/frame';

import EditResourceDialog from '../EditResourceDialog';
import SelectResourceDialogPres from './SelectResourceDialogPres';

SelectResourceDialog.defaultProps = {
  stringField: 'name',
  idField: 'id',
  editDialogProps: {},
};

function SelectResourceDialog({
  editDialogProps,
  idField,
  initialParams,
  resource,
  stringField,
  resourceName: resourceNameProp,
  ...rest
}) {
  const resourceName = resourceNameProp || resource.slice(0, -1);
  const editDialogName = `EDIT_${resource}_DIALOG`;
  const itemToString = item => (item == null ? '' : item[stringField]);
  const comparator = (x, y) => x[idField] === y[idField];

  const renderFunc = (
    editResourceDialog,
    confirmationModal,
    crud,
    recordsMany
  ) => {
    const { onOpen: onOpenEdit } = editResourceDialog;
    const { onOpen: onOpenConfirmation } = confirmationModal;
    const { destroy } = crud;
    const { data = {}, ids = [] } = recordsMany;

    const items = ids.map(id => data[id]);
    const onDelete = item =>
      onOpenConfirmation({
        title: `Delete the ${resourceName}?`,
        onConfirm: () => destroy({ id: item[idField] }),
      });

    const onEdit = item => onOpenEdit({ id: item[idField] });

    const onCreate = () => onOpenEdit();

    const editDialog = (
      <EditResourceDialog
        {...{
          name: editDialogName,
          ...editDialogProps,
        }}
      />
    );

    return (
      <SelectResourceDialogPres
        {...{
          comparator,
          editDialog,
          itemToString,
          items,
          onCreate,
          onDelete,
          onEdit,
          resourceName,
          ...rest,
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
        <Crud.RecordsMany resource={resource} initialParams={initialParams} />,
      ]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default SelectResourceDialog;
