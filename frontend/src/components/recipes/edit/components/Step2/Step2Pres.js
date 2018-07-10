import React from 'react';
import classNames from 'classnames';
import {
  Button,
  Card,
  CardContent,
  Divider,
  InputAdornment,
  withStyles,
} from '@material-ui/core';

import {
  Actions,
  ActionsLeft,
  ActionsRight,
  ToggleField,
} from 'lib/mui-components';

import { TextField } from 'components/utils';
import {
  IngredientsSection,
  NotesSection,
  PreparationSection,
  ResetDialog,
  TitleField,
} from './components';
import { ControlWrapper } from '..';

const styles = theme => ({
  actions: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
  },
  actionsLeft: {
    display: 'flex',
    flex: '1 0 auto',
    justifyContent: 'flex-start',
  },
  actionsRight: {
    display: 'flex',
    flex: '0 1 auto',
    justifyContent: 'flex-end',
  },
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
          <TitleField
            className={classes.marginBottom}
            {...getInputProps({ name: 'title' })}
          />
          <div className={classNames(classes.actions, classes.marginBottom)}>
            <div className={classes.actionsLeft}>
              <TextField
                className={classes.marginRight}
                {...getInputProps({
                  label: 'Serves',
                  name: 'serves',
                  type: 'number',
                  step: 1,
                })}
              />
              <TextField
                className={classes.marginRight}
                {...getInputProps({
                  label: 'Prep. time',
                  name: 'prep_time',
                  type: 'number',
                  step: 1,
                })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">minutes</InputAdornment>
                  ),
                }}
              />
              <TextField
                {...getInputProps({
                  label: 'Cooking time',
                  name: 'cook_time',
                  type: 'number',
                  step: 1,
                })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">minutes</InputAdornment>
                  ),
                }}
              />
            </div>
            <div className={classes.actionsRight}>
              <ToggleField
                {...getInputProps({
                  label: 'Public',
                  name: 'public',
                  error: undefined,
                  touched: undefined,
                  color: 'primary',
                })}
              />
            </div>
          </div>
          <NotesSection
            className={classes.marginBottom}
            inputProps={getInputProps({ name: 'notes' })}
          />
          <ControlWrapper>
            <IngredientsSection
              inputProps={getInputProps({ name: 'ingredients' })}
            />
          </ControlWrapper>
          <ControlWrapper>
            <PreparationSection
              inputProps={getInputProps({ name: 'preparation' })}
            />
          </ControlWrapper>
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
