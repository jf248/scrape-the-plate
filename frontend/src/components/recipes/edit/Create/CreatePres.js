import React from 'react';
import {
  Card,
  Dialog,
  DialogTitle,
  Stepper,
  Step,
  StepLabel,
  Typography,
  withStyles,
} from '@material-ui/core';

import { AppContent } from 'lib/mui-app';
import { Step1, Step2 } from '../components';

const styles = theme => ({
  stepper: {
    marginBottom: theme.spacing.unit / 2,
  },
});

function CreatePres(props) {
  const {
    classes,
    activeStep,
    scrapedData,
    isSubmitting,
    skip,
    goBack,
    getInputProps,
    getSubmitProps,
    selectDomain,
    sources,
  } = props;
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
            skip,
            goBack,
            getInputProps,
            getSubmitProps,
            selectDomain,
            sources,
          }}
        />
      )}
      {activeStep === 1 && (
        <Step2 isCreate={true} initialValues={scrapedData} goBack={goBack} />
      )}
      <Dialog open={isSubmitting}>
        <DialogTitle>{"Hang on we're scraping..."}</DialogTitle>
      </Dialog>
    </AppContent>
  );
}

export default withStyles(styles)(CreatePres);
