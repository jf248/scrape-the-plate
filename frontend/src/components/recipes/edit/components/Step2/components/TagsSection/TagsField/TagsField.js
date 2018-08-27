import React from 'react';

import { Compose } from 'lib/react-powerplug';
import { RecordsMany } from 'lib/crud';
import * as Enhanced from 'lib/mui-components';

import TagsFieldPres from './TagsFieldPres';

function TagsField(props) {
  const { inputProps, ...rest } = props;
  const {
    value: valueProp,
    error,
    touched,
    onChange: onChangeProp,
    onBlur,
  } = inputProps;

  const value = valueProp ? valueProp : [];

  const renderFunc = (modal, recordsMany) => {
    const { onOpen: onOpenModal, getModalProps } = modal;
    const { data } = recordsMany;

    const selectedItems = value.map(id => data[id]);
    const tagNames = selectedItems.map(item => item.name);
    const onChange = items => onChangeProp(items && items.map(item => item.id));

    return (
      <TagsFieldPres
        {...{
          error,
          getModalProps,
          onBlur,
          onChange,
          onOpenModal,
          tagNames,
          touched,
          selectedItems,
          ...rest,
        }}
      />
    );
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[
        <Enhanced.ModalController />,
        <RecordsMany resource={'tags'} />,
      ]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default TagsField;
