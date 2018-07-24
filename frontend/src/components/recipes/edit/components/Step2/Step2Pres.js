import React from 'react';
import {
  Button,
  Card,
  CardContent,
  Divider,
  withStyles,
} from '@material-ui/core';

import {
  Actions,
  ActionsLeft,
  ActionsRight,
  ToggleField,
} from 'lib/mui-components';

import { FlexContainer, FlexGrow, FlexShrink } from 'components/utils';
import {
  IngredientsSection,
  NotesSection,
  PreparationSection,
  ResetDialog,
  TitleField,
  DetailsSection,
  SourceSection,
} from './components';

const styles = theme => ({
  marginRight: {
    marginRight: theme.spacing.unit * 2,
  },
  marginBottom: {
    marginBottom: theme.spacing.unit * 3,
  },
});

function Step2Pres(props) {
  const {
    classes,
    isCreate,
    goBack,
    getInputProps,
    resetForm,
    getSubmitProps,
    getModalProps,
    openModal,
  } = props;
  return (
    <React.Fragment>
      <Card>
        <CardContent>
          <FlexContainer className={classes.marginBottom}>
            <FlexGrow>
              <TitleField
                className={classes.marginRight}
                {...getInputProps({ name: 'title' })}
              />
            </FlexGrow>
            <FlexShrink>
              <ToggleField
                {...getInputProps({
                  label: 'Public',
                  name: 'public',
                  error: undefined,
                  touched: undefined,
                  color: 'primary',
                })}
              />
            </FlexShrink>
          </FlexContainer>
          <IngredientsSection
            defaultExpanded={false}
            inputProps={getInputProps({ name: 'ingredients' })}
          />
          <PreparationSection
            defaultExpanded={false}
            inputProps={getInputProps({ name: 'preparation' })}
          />
          <NotesSection
            defaultExpanded={false}
            inputProps={getInputProps({ name: 'notes' })}
          />
          <DetailsSection
            defaultExpanded={false}
            prepTimeInputProps={getInputProps({ name: 'prep_time' })}
            cookTimeInputProps={getInputProps({ name: 'cook_time' })}
            servesInputProps={getInputProps({ name: 'serves' })}
          />
          <SourceSection
            defaultExpanded={true}
            sourceInputProps={getInputProps({ name: 'source' })}
            urlInputProps={getInputProps({ name: 'url' })}
            bookInputProps={getInputProps({ name: 'book' })}
            pageInputProps={getInputProps({ name: 'page' })}
          />
        </CardContent>
        <Divider />
        <Actions>
          {isCreate && (
            <ActionsLeft>
              <Button size={'small'} onClick={goBack}>
                Back
              </Button>
            </ActionsLeft>
          )}
          <ActionsRight>
            <Button size={'small'} onClick={() => openModal('reset')}>
              Reset
            </Button>
            <Button
              {...getSubmitProps({
                size: 'small',
                color: 'primary',
              })}
            >
              Save
            </Button>
          </ActionsRight>
        </Actions>
      </Card>
      <ResetDialog
        resetForm={resetForm}
        {...getModalProps({ name: 'reset' })}
      />
    </React.Fragment>
  );
}

export default withStyles(styles)(Step2Pres);
