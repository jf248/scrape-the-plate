import React from 'react';
import classNames from 'classnames';
import { Typography, withStyles } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

import {
  ExpansionSection,
  ExpansionDetails,
  ExpansionSummary,
} from 'lib/mui-components';

import { TextField } from 'components/utils';

const styles = () => ({
  root: {},
  details: {
    display: 'block',
  },
});

NotesSection.defaultProps = {};

function NotesSection(props) {
  const { classes, className: classNameProp, inputProps, ...rest } = props;

  const className = classNames(classes.root, classNameProp);

  return (
    <ExpansionSection className={className} initialExpanded {...rest}>
      <ExpansionSummary expandIcon={<ExpandMore />}>
        <Typography variant={'subheading'}>Notes</Typography>
      </ExpansionSummary>
      <ExpansionDetails className={classes.details}>
        <TextField
          {...inputProps}
          placeholder={'Notes...'}
          fullWidth
          multiline={true}
        />
      </ExpansionDetails>
    </ExpansionSection>
  );
}

export default withStyles(styles)(NotesSection);
