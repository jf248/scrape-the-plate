import React from 'react';

import { Compose, callAll } from 'lib/react-powerplug';

import { Modal } from 'controllers/modal';
import ConfirmationModalPres from './ConfirmationModalPres';

function ConfirmationModal({ name }) {
  const renderFunc = modal => {
    const { isOpen, onClose, modalProps = {} } = modal;
    const { onConfirm } = modalProps;

    const handleConfirm = () => {
      if (onConfirm) {
        onConfirm();
      } else {
        console.warn('Confirmation Modal: no onConfirm prop'); // eslint-disable-line no-console
      }
      onClose();
    };

    return (
      <ConfirmationModalPres
        {...{
          isOpen,
          ...modalProps,
          onClose: callAll(modalProps.onClose, onClose),
          onConfirm: handleConfirm,
        }}
      />
    );
  };

  /* eslint-disable react/jsx-key */
  return (
    <Compose
      components={[<Modal provider name={name} />]}
      render={renderFunc}
    />
  );
  /* eslint-enable react/jsx-key */
}

export default ConfirmationModal;
