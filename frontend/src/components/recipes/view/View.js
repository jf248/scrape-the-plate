import React from 'react';
import { Record } from 'lib/crud';

import ViewPres from './ViewPres';

function View(props) {
  const {
    match: {
      params: { id },
    },
  } = props;
  const renderFunc = ({ record }) => {
    return <ViewPres {...{ record }} />;
  };

  return <Record resource={'recipes'} id={id} render={renderFunc} />;
}

export default View;
