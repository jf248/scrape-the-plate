import React from 'react';

import { Compose } from 'lib/react-powerplug';
import { RecordsMany } from 'lib/crud';
import * as Enhanced from 'lib/mui-components';

import BookFieldPres from './BookFieldPres';

function BookField(props) {
  const { bookInputProps, ...rest } = props;
  const {
    value,
    error,
    touched,
    onChange: onChangeProp,
    onBlur,
  } = bookInputProps;

  const renderFunc = (modal, recordsMany) => {
    const { onOpen: onOpenModal, getModalProps } = modal;
    const { data } = recordsMany;

    const title = data[value] && data[value].title ? data[value].title : '';
    const onChange = item => onChangeProp(item && item.id);

    return (
      <BookFieldPres
        {...{
          error,
          getModalProps,
          onBlur,
          onChange,
          onOpenModal,
          title,
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
        <RecordsMany resource={'books'} />,
      ]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default BookField;
