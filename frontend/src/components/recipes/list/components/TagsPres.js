import React from 'react';
import * as Mui from '@material-ui/core';

import * as Common from 'components/common';

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
  return tagNames.map(tagName => (
    <Common.SubheadingItem halfMargin key={tagName}>
      {tagName}
    </Common.SubheadingItem>
  ));
}

export default Mui.withStyles(styles)(TagsPres);
