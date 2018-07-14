import React from 'react';

import { AppFabButton } from 'lib/mui-app';

function FabButtonPres(props) {
  const { isLoggedIn, ...rest } = props;

  return isLoggedIn ? <AppFabButton {...rest} /> : null;
}

export default FabButtonPres;
