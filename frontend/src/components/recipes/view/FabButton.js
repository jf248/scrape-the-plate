import React from 'react';

import { AppFabButton } from 'lib/mui-app';

function FabButtonPres(props) {
  const { isLoggedIn, isOwner, onEdit, onCopy } = props;

  return (
    isLoggedIn && (
      <AppFabButton
        {...{
          variant: isOwner ? 'edit' : 'copy',
          onClick: isOwner ? onEdit : onCopy,
        }}
      />
    )
  );
}

export default FabButtonPres;
