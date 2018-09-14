import React from 'react';

import { ListField } from 'lib/react-listfield';
import * as PowerPlug from 'lib/react-powerplug';
import * as MuiC from 'lib/mui-components';

import * as Common from 'components/common';
import * as GroceryItems from 'components/groceryItems';
import Ingredient from './Ingredient';

function IngredientsField(props) {
  const { value, onChange, onBlur, error } = props;

  const getError = index => (Array.isArray(error) ? error[index] : undefined);

  const renderFunc = (modal, listField) => {
    const { items, getItemProps } = listField;
    const { onOpenWithProps, getModalProps } = modal;
    /* eslint-disable react/jsx-key */
    return (
      <React.Fragment>
        {items.map((item, index) => (
          <Ingredient
            {...getItemProps({
              item,
              index,
              onOpenWithProps,
              error: getError(index),
            })}
          />
        ))}
        <Common.SelectResourceDialog
          {...getModalProps({
            editDialogProps: GroceryItems.editDialogProps,
            multiple: false,
            resource: 'groceryItems',
            stringField: 'name',
            resourceName: 'grocery item',
            itemToGroup: item => item && item.group && item.group.name,
            comparator: (x, y) => x.id === y.id,
            initialParams: { sort: ['group__name', 'name'] },
          })}
        />
      </React.Fragment>
    );
    /* eslint-enable react/jsx-key */
  };

  return (
    /* eslint-disable react/jsx-key */
    <PowerPlug.Compose
      components={[
        <MuiC.ModalController />,
        <ListField
          value={value}
          blankItem={{ text: '' }}
          onChange={onChange}
          onBlur={onBlur}
          render={renderFunc}
        />,
      ]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default IngredientsField;
