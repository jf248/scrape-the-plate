import React from 'react';

import { renderProps } from 'lib/react-powerplug';
import { Queue } from 'lib/redux-queue';

function Modal(props) {
  const { provider, name = 'MODAL' } = props;

  const renderFunc = queueController => {
    const { pop, push, queue, hasItems: isOpen } = queueController;
    const onOpen = (payload = {}) => {
      push(payload);
    };
    const onClose = () => {
      pop();
    };
    const modalProps = queue[0] || {};
    return renderProps(props, { onOpen, onClose, modalProps, isOpen });
  };

  return <Queue provider={provider} name={name} render={renderFunc} />;
}

export default Modal;
