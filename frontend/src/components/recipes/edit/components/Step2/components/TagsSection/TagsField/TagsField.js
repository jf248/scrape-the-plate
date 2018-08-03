import React from 'react';

import { Compose } from 'lib/react-powerplug';
import { RecordsMany } from 'lib/crud';
import * as Enhanced from 'lib/mui-components';

import TagsFieldPres from './TagsFieldPres';

function TagsField(props) {
  const { inputProps, ...rest } = props;
  const { value: valueProp, error, touched, onChange, onBlur } = inputProps;

  const value = valueProp ? valueProp : [];

  const renderFunc = (modal, recordsMany) => {
    const { onOpen: onOpenModal, getModalProps } = modal;
    const { data = [] } = recordsMany;

    const tagNames = value ? value.map(id => data[id].name) : [];

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
          value,
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
