import React from 'react';

import { Modals } from 'lib/mui-components';
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
    const { openModal, getModalProps } = modal;

    return (
      <Step1Pres
        {...{
          focus,
          getFocusProps,
          getInputProps,
          getModalProps,
          getRootProps,
          getSubmitProps,
          openModal,
          scrapeDisabled,
          selectDomain,
          skip,
          sources,
        }}
      />
    );
  };

  /* eslint-disable react/jsx-key */
  return <Compose components={[<Focus />, <Modals />]} render={renderFunc} />;
  /* eslint-enable react/jsx-key */
}

export default Step1;
