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

import {
  IngredientsSection,
  NotesSection,
  PreparationSection,
  ResetDialog,
  TitleField,
  FlexContainer,
  FlexLeft,
  FlexRight,
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
            <FlexLeft>
              <TitleField
                className={classes.marginRight}
                {...getInputProps({ name: 'title' })}
              />
            </FlexLeft>
            <FlexRight>
              <ToggleField
                {...getInputProps({
                  label: 'Public',
                  name: 'public',
                  error: undefined,
                  touched: undefined,
                  color: 'primary',
                })}
              />
            </FlexRight>
          </FlexContainer>
          <IngredientsSection
            defaultExpanded
            inputProps={getInputProps({ name: 'ingredients' })}
          />
          <PreparationSection
            defaultExpanded
            inputProps={getInputProps({ name: 'preparation' })}
          />
          <NotesSection inputProps={getInputProps({ name: 'notes' })} />
          <DetailsSection
            prepTimeInputProps={getInputProps({ name: 'prep_time' })}
            cookTimeInputProps={getInputProps({ name: 'cook_time' })}
            servesInputProps={getInputProps({ name: 'serves' })}
          />
          <SourceSection
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
