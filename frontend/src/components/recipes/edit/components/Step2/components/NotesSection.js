import React from 'react';
import classNames from 'classnames';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  withStyles,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

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
    <ExpansionPanel className={className} defaultExpanded {...rest}>
      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
        <Typography variant={'subheading'}>Notes</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        <TextField
          {...inputProps}
          placeholder={'Notes...'}
          fullWidth
          multiline={true}
        />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default withStyles(styles)(NotesSection);
