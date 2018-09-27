import React from 'react';
import * as Mui from '@material-ui/core';

const styles = theme => ({
  chip: {
    marginBottom: theme.spacing.unit,
    marginRight: theme.spacing.unit / 2,
  },
});

TagPres.defaultProps = {};

function TagPres({ classes, name }) {
  return <Mui.Chip {...{ label: name, className: classes.chip }} />;
}

export default Mui.withStyles(styles)(TagPres);
