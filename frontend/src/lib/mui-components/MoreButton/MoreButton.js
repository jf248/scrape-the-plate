import React from 'react';

import { Compose, callAll } from 'lib/react-powerplug';
import { MenuController } from 'lib/mui-components';

import MoreButtonPres from './MoreButtonPres';

function MoreButton(props) {
  const renderFunc = (menu, login, auth) => {
    const { onClick, anchorEl, open, onClose } = menu;

    return (
      <MoreButtonPres
        {...{
          anchorEl,
          open,
          ...props,
          onClick: callAll(props.onClick, onClick),
          onClose: callAll(props.onClose, onClose),
        }}
      />
    );
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose components={[<MenuController />]} render={renderFunc} />
    /* eslint-enable react/jsx-key */
  );
}

export default MoreButton;
