import React from 'react';
import classNames from 'classnames';
import { Typography, withStyles } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

import { PreparationField } from '.';
import {
  ExpansionSection,
  ExpansionDetails,
  ExpansionSummary,
} from 'lib/mui-components';

const styles = () => ({
  root: {},
  expansionDetails: {
    display: 'block',
  },
});

PreparationSection.defaultProps = {};

function PreparationSection(props) {
  const { classes, className: classNameProp, inputProps, ...rest } = props;

  const className = classNames(classes.root, classNameProp);

  return (
    <ExpansionSection className={className} initialExpanded {...rest}>
      <ExpansionSummary expandIcon={<ExpandMore />}>
        <Typography variant={'subheading'}>Preparation</Typography>
      </ExpansionSummary>
      <ExpansionDetails className={classes.expansionDetails}>
        <Typography variant={'caption'} paragraph>
          Add the preparation steps one by one, or paste them all at once.
        </Typography>
        <PreparationField {...inputProps} />
      </ExpansionDetails>
    </ExpansionSection>
  );
}

export default withStyles(styles)(PreparationSection);
