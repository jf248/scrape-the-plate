import React from 'react';

import Loading from 'controllers/Loading';
import CircularProgressPres from './CircularProgressPres';

function CircularProgress() {
  return (
    <Loading
      render={({ loading }) => <CircularProgressPres {...{ loading }} />}
    />
  );
}

export default CircularProgress;
