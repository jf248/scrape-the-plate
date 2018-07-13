import React from 'react';

import ViewController from 'controllers/View'
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

  return <ViewController resource={'recipes'} id={id} render={renderFunc} />;
}

export default View;
