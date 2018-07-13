import React from 'react';

import Is404 from 'controllers/Is404';
import ComponentOr404Pres from './ComponentOr404Pres';

function ComponentOr404(props) {

  const renderFunc = ({ is404 }) => {
    return (
      <ComponentOr404Pres {...{is404, ...props}} />
    );
  };

  return (
      <Is404 render={renderFunc}/>
  );
}

export default ComponentOr404;
