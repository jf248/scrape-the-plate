import React from 'react';

import { NotFound } from 'components/not-found';

ComponentOr404Pres.defaultProps = {
};

function ComponentOr404Pres(props) {
  const { component: Component, is404, ...rest } = props;

  return (
    is404 ? <NotFound/> : <Component {...rest}/>
  );
}

export default ComponentOr404Pres;
