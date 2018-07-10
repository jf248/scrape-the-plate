import React from 'react';
import { CircularProgress as MuiCircularProgress } from '@material-ui/core';

function CircularProgressPres(props) {
  const { isLoading } = props;
  return isLoading ? <MuiCircularProgress color={'inherit'} /> : null;
}

export default CircularProgressPres;
