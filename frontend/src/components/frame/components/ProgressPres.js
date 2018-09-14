import React from 'react';
import * as Mui from '@material-ui/core';

const styles = () => ({
  root: {
    position: 'static',
  },
});

function ProgressPres(props) {
  const { isLoading, classes } = props;
  return isLoading ? (
    <Mui.CircularProgress color={'inherit'} className={classes.root} />
  ) : null;
}

export default Mui.withStyles(styles)(ProgressPres);
