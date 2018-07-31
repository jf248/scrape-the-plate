import React from 'react';

import { Compose } from 'lib/react-powerplug';
import { RecordsMany } from 'lib/crud';

import { TAGS_DIALOG } from 'components/tags';
import { Modal } from 'controllers/modal';
import TagsFieldPres from './TagsFieldPres';

function BookTitleField(props) {
  const { inputProps, ...rest } = props;
  const { value = [], error, touched, onChange, onBlur } = inputProps;

  const renderFunc = (modal, recordsMany) => {
    const { onOpen } = modal;
    const { ids, data = [] } = recordsMany;

    const tagNames = data
      .filter(tag => value.includes(tag.id))
      .map(tag => tag.name);

    const onOpenDialog = () => onOpen({});

    return (
      <TagsFieldPres
        {...{
          value,
          tagNames,
          error,
          ids,
          data,
          onChange,
          touched,
          onBlur,
          onOpenDialog,
          ...rest,
        }}
      />
    );
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[
        <Modal name={TAGS_DIALOG} />,
        <RecordsMany resource={'tags'} />,
      ]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default BookTitleField;
