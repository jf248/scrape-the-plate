import React from 'react';
import * as Mui from '@material-ui/core';

import * as Common from 'components/common';

const styles = theme => ({});

TagPres.defaultProps = {};

function TagPres({ classes, name }) {
  return <Common.SubheadingItem halfMargin>{name}</Common.SubheadingItem>;
}

export default Mui.withStyles(styles)(TagPres);
