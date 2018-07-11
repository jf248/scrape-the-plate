import React from 'react';

import { Compose, Toggle } from 'lib/react-powerplug';
import { RecordsMany } from 'lib/crud';

import BookTitleFieldPres from './BookTitleFieldPres';

function BookTitleField(props) {
  const { bookInputProps, ...rest } = props;
  const {
    value: id,
    error,
    touched,
    onChange: onChangeId,
    onBlur,
  } = bookInputProps;

  const renderFunc = (toggle, recordsMany) => {
    const {
      on: isModalOpen,
      switchOff: onCloseModal,
      switchOn: onOpenModal,
    } = toggle;
    const { ids, data } = recordsMany;

    return (
      <BookTitleFieldPres
        {...{
          id,
          error,
          ids,
          data,
          onChangeId,
          touched,
          isModalOpen,
          onCloseModal,
          onOpenModal,
          onBlur,
          ...rest,
        }}
      />
    );
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[<Toggle />, <RecordsMany resource={'books'} />]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default BookTitleField;
