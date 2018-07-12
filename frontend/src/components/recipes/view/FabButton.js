import React from 'react';

import { Auth } from 'lib/auth';

import FabButtonPres from './FabButtonPres';

function FabButton(props) {

  const renderFunc = ({ isLoggedIn }) => {
    return (
      <FabButtonPres {...{isLoggedIn, props}} />
    );
  };

  return (
      <Auth render={renderFunc}/>
  );
}

export default FabButton;
