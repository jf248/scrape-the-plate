import React from 'react';

import * as PowerPlug from 'lib/react-powerplug';
import { ModalController } from 'lib/mui-components';

import DrawerContentPres from './DrawerContentPres';

function DrawerContent(props) {
  const { ...rest } = props;

  const renderFunc = modal => {
    const { getModalProps, onOpen } = modal;

    return (
      <DrawerContentPres
        onAddTag={onOpen}
        getModalProps={getModalProps}
        {...rest}
      />
    );
  };

  return (
    /* eslint-disable react/jsx-key */
    <PowerPlug.Compose components={[<ModalController />]} render={renderFunc} />
    /* eslint-enable react/jsx-key */
  );
}

export default DrawerContent;
