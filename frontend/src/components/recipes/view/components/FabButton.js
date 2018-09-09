import React from 'react';

import { AppFabButton } from 'lib/mui-app';

function FabButtonPres(props) {
  const { isLoggedIn, isOwner, onClickEdit, onClickCopy, ...rest } = props;

  return (
    isLoggedIn && (
      <AppFabButton
        {...{
          variant: isOwner ? 'edit' : 'copy',
          tooltipTitle: isOwner ? 'Edit this recipe' : 'Copy this recipe',
          onClick: isOwner ? onClickEdit : onClickCopy,
          ...rest,
        }}
      />
    )
  );
}

export default FabButtonPres;
