import React from 'react';
import {
  Card,
  Stepper,
  Step,
  StepLabel,
  Typography,
  withStyles,
} from '@material-ui/core';

import { AppContent } from 'components/frame';
import { Step1, Step2 } from './components';

const styles = theme => ({
  stepper: {
    marginBottom: theme.spacing.unit / 2,
  },
});

function CreatePres(props) {
  const { classes, activeStep, scrapedData, goBack, ...rest } = props;
  const steps = [
    {
      label: 'Scrape a recipe',
      optional: <Typography variant="caption">Optional</Typography>,
    },
    { label: 'Edit the recipe' },
  ];

  return (
    <AppContent>
      <Card className={classes.stepper}>
        <Stepper activeStep={activeStep}>
          {steps.map(({ label, optional }) => (
            <Step key={label}>
              <StepLabel optional={optional}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Card>
      {activeStep === 0 && (
        <Step1
          {...{
            goBack,
            ...rest,
          }}
        />
      )}
      {activeStep === 1 && (
        <Step2 isCreate={true} initialValues={scrapedData} goBack={goBack} />
      )}
    </AppContent>
  );
}

export default withStyles(styles)(CreatePres);
