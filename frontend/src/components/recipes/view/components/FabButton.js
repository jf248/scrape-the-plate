import React from 'react';

import { AppFabButton } from 'lib/mui-app';

function FabButtonPres(props) {
  const { isLoggedIn, isOwner, onClickEdit, onClickCopy } = props;

  return (
    isLoggedIn && (
      <AppFabButton
        {...{
          variant: isOwner ? 'edit' : 'copy',
          onClick: isOwner ? onClickEdit : onClickCopy,
        }}
      />
    )
  );
}

export default FabButtonPres;
