import React from 'react';

import { Loading } from 'controllers/loading';
import CircularProgressPres from './CircularProgressPres';

function CircularProgress() {
  return (
    <Loading
      render={({ isLoading }) => <CircularProgressPres {...{ isLoading }} />}
    />
  );
}

export default CircularProgress;
