import React from 'react';
import { Button } from '@material-ui/core';

function Actions(props) {
  const { openResetModal, getSubmitProps } = props;

  return (
    <React.Fragment>
      <Button size={'small'} onClick={openResetModal}>
        Reset
      </Button>
      <Button
        {...getSubmitProps({
          size: 'small',
          color: 'primary',
        })}
      >
        Save
      </Button>
    </React.Fragment>
  );
}

export default Actions;
