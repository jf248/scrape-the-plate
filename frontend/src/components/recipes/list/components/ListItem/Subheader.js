import React from 'react';
import { Typography, withStyles } from '@material-ui/core';

import { formatMins } from 'utils';
import { Source, SubheadingLabel } from 'components/utils';

const styles = () => ({
  label: {},
});

Subheader.defaultProps = {};

function Subheader(props) {
  const { item, isOwner } = props;

  const { source, prep_time, cook_time, url, book, page, user } = item;

  return (
    <React.Fragment>
      <div>
        <Source
          {...{ source, url, book, page, user, isOwner, includePage: false }}
        />
      </div>
      <Typography variant={'caption'}>
        {prep_time && (
          <SubheadingLabel>{`Prep ${formatMins(prep_time)}`}</SubheadingLabel>
        )}
        {cook_time && (
          <SubheadingLabel>{`Cook ${formatMins(cook_time)}`}</SubheadingLabel>
        )}
      </Typography>
    </React.Fragment>
  );
}

export default withStyles(styles)(Subheader);
