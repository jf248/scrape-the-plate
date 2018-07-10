import React from 'react';
import { withStyles } from '@material-ui/core';

import { AppContent } from 'lib/mui-app';

// Temp
import { Typography } from '@material-ui/core';

import { ExpandMore } from '@material-ui/icons';
import { Link } from 'react-router-dom';

import {
  ExpansionSection,
  ExpansionDetails,
  ExpansionSummary,
} from 'lib/mui-components';

const styles = () => ({
  content: {
    paddingTop: 32,
  },
});

function TempPage(props) {
  const { classes } = props;

  return (
    <AppContent className={classes.content}>
      <Typography gutterBottom variant={'display2'}>
        Temp Page
      </Typography>
      <ExpansionSection>
        <ExpansionSummary expandIcon={<ExpandMore />}>
          <Typography>Expansion Section 1</Typography>
        </ExpansionSummary>
        <ExpansionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionDetails>
      </ExpansionSection>
      <ExpansionSection>
        <ExpansionSummary expandIcon={<ExpandMore />}>
          <Typography>Expansion Section 2</Typography>
        </ExpansionSummary>
        <ExpansionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionDetails>
      </ExpansionSection>
      <Link to={'/'}>Link</Link>
    </AppContent>
  );
}

export default withStyles(styles)(TempPage);
