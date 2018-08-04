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
  return (
    <div>
      {tagNames.map(name => (
        <Mui.Chip {...{ key: name, label: name, className: classes.chip }} />
      ))}
    </div>
  );
}

export default Mui.withStyles(styles)(TagsPres);
