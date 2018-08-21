import React from 'react';
import * as Mui from '@material-ui/core';

function LinearProgressPres(props) {
  const { isLoading } = props;
  return isLoading ? <Mui.LinearProgress color={'secondary'} /> : null;
}

export default LinearProgressPres;
