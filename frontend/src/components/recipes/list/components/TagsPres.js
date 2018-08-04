import React from 'react';
import * as Mui from '@material-ui/core';

const styles = theme => ({
  chip: {
    marginBottom: theme.spacing.unit,
    marginRight: theme.spacing.unit / 2,
  },
});

TagsPres.defaultProps = {
  tagNames: [],
};

function TagsPres({ classes, tagNames }) {
  return tagNames.length > 0 ? (
    <span>{`Tags: ${tagNames.join(', ')}`}</span>
  ) : null;
}

export default Mui.withStyles(styles)(TagsPres);
