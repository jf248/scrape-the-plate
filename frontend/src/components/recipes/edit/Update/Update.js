import React from 'react';

import { AppContent } from 'lib/mui-app';

import { Step2 } from '../components';

function Update(props) {
  const {
    match: {
      params: { id },
    },
  } = props;
  return (
    <AppContent>
      <Step2 id={id} isCreate={false} />
    </AppContent>
  );
}

export default Update;
