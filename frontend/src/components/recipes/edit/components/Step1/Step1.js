import React from 'react';

import * as Enhanced from 'lib/mui-components';
import { Compose, Focus } from 'lib/react-powerplug';

import Step1Pres from './Step1Pres';

function Step1(props) {
  const {
    getInputProps,
    getRootProps,
    getSubmitProps,
    isValid,
    selectDomain,
    skip,
    sources,
    values,
  } = props;

  const scrapeDisabled = !isValid || !values.url;

  const renderFunc = (focuser, modal) => {
    const { getFocusProps, focus } = focuser;
    const { onOpen: onOpenModal, getModalProps } = modal;

    return (
      <Step1Pres
        {...{
          focus,
          getFocusProps,
          getInputProps,
          getModalProps,
          getRootProps,
          getSubmitProps,
          onOpenModal,
          scrapeDisabled,
          selectDomain,
          skip,
          sources,
        }}
      />
    );
  };

  /* eslint-disable react/jsx-key */
  return (
    <Compose
      components={[<Focus />, <Enhanced.ModalController />]}
      render={renderFunc}
    />
  );
  /* eslint-enable react/jsx-key */
}

export default Step1;
