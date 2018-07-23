import React from 'react';
import { Typography, withStyles } from '@material-ui/core';

import { Link } from 'lib/mui-components';

import { formatMins } from 'utils';
import { SubheadingLabel } from 'components/utils';

const styles = () => ({
  label: {},
  link: {
    display: 'block',
  },
});

Subheader.defaultProps = {};

function Subheader(props) {
  const { classes, item } = props;

  const { source, prep_time, cook_time, url } = item;

  return (
    <React.Fragment>
      {source && (
        <Link
          className={classes.link}
          target={'_blank'}
          onClick={event => event.stopPropagation()}
          href={url}
        >
          {source.name}
        </Link>
      )}
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
