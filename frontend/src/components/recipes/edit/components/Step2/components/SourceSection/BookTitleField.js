import React from 'react';

import { Compose, Toggle } from 'lib/react-powerplug';
import { RecordsMany } from 'lib/crud';

import BookTitleFieldPres from './BookTitleFieldPres';

function BookTitleField(props) {
  const { bookInputProps, ...rest } = props;
  const { value, error, touched, onChange, onBlur } = bookInputProps;

  const renderFunc = (toggle, recordsMany) => {
    const {
      on: isModalOpen,
      switchOff: onCloseModal,
      switchOn: onOpenModal,
    } = toggle;
    const { ids, data } = recordsMany;

    const title = data[value] && data[value].title ? data[value].title : '';

    return (
      <BookTitleFieldPres
        {...{
          value,
          title,
          error,
          ids,
          data,
          onChange,
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