import React from 'react';
import classNames from 'classnames';
import { Typography, withStyles } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

import {
  ExpansionSection,
  ExpansionDetails,
  ExpansionSummary,
} from 'lib/mui-components';
import { IngredientsField } from '.';

const styles = () => ({
  root: {},
  details: {
    display: 'block',
  },
});

IngredientsSection.defaultProps = {};

function IngredientsSection(props) {
  const { classes, className: classNameProp, inputProps, ...rest } = props;

  const className = classNames(classes.root, classNameProp);

  return (
    <ExpansionSection className={className} initialExpanded {...rest}>
      <ExpansionSummary expandIcon={<ExpandMore />}>
        <Typography variant={'subheading'}>Ingredients</Typography>
      </ExpansionSummary>
      <ExpansionDetails className={classes.details}>
        <Typography variant={'caption'} paragraph>
          Add ingredients one by one, or paste them all at once.
        </Typography>
        <IngredientsField {...inputProps} />
      </ExpansionDetails>
    </ExpansionSection>
  );
}

export default withStyles(styles)(IngredientsSection);
