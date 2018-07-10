import React from 'react';

import { Modals } from 'lib/mui-components';
import { Compose, Focus } from 'lib/react-powerplug';

import Step1Pres from './Step1Pres';

function Step1(props) {
  const { skip, getInputProps, getSubmitProps, selectDomain, sources } = props;

  const renderFunc = (focuser, modal) => {
    const { getFocusProps, focus } = focuser;
    const { openModal, getModalProps } = modal;

    return (
      <Step1Pres
        {...{
          skip,
          getInputProps,
          getSubmitProps,
          selectDomain,
          getFocusProps,
          focus,
          openModal,
          getModalProps,
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
