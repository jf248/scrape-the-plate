import React from 'react';

import { Loading } from 'controllers/loading';
import ProgressPres from './ProgressPres';

function Progress() {
  return (
    <Loading render={({ isLoading }) => <ProgressPres {...{ isLoading }} />} />
  );
}

export default Progress;
