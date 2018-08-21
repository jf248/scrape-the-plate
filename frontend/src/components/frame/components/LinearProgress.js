import React from 'react';

import { Loading } from 'controllers/loading';
import LinearProgressPres from './LinearProgressPres';

function LinearProgress() {
  return (
    <Loading
      render={({ isLoading }) => <LinearProgressPres {...{ isLoading }} />}
    />
  );
}

export default LinearProgress;
