import React from 'react';
import { withStyles } from '@material-ui/core';

import { Link } from 'lib/mui-components';

import { formatMins } from 'utils';
import { SubheadingLabel } from 'components/utils';

const styles = () => ({
  label: {
    fontSize: '12px',
  },
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
      {prep_time && (
        <SubheadingLabel
          className={classes.label}
          label={'Prep'}
          content={`${formatMins(prep_time)}`}
        />
      )}
      {cook_time && (
        <SubheadingLabel
          className={classes.label}
          label={'Cook'}
          content={`${formatMins(cook_time)}`}
        />
      )}
    </React.Fragment>
  );
}

export default withStyles(styles)(Subheader);
