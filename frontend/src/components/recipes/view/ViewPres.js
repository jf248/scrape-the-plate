import React from 'react';
import { Divider, MenuItem, withStyles } from '@material-ui/core';

import { AppContent } from 'lib/mui-app';
import { MoreButton } from 'lib/mui-components';

import { Time, Source, SubheadingItem } from 'components/common';
import {
  Content,
  FabButton,
  Ingredients,
  Preparation,
  Subheading,
  Title,
  Tags,
} from './components';

const styles = theme => ({
  divider: {
    marginBottom: theme.spacing.unit * 4,
  },
  label: {
    color: theme.typography.subheading.color,
  },
  noPrint: {
    '@media print': {
      display: 'none',
    },
  },
});

ViewPres.defaultProps = {
  recipe: {},
};

function ViewPres(props) {
  const {
    classes,
    isLoggedIn,
    isOwner,
    onClickCopy,
    onClickDelete,
    onClickEdit,
    onMoreButtonClick,
    recipe,
  } = props;
  const {
    tags,
    title,
    ingredients,
    preparation,
    prep_time,
    cook_time,
    notes,
    serves,
  } = recipe;

  return (
    <AppContent>
      <Title
        title={title}
        moreButton={
          <MoreButton onClick={onMoreButtonClick} className={classes.noPrint}>
            {isOwner && <MenuItem onClick={onClickEdit}>{'Edit'}</MenuItem>}
            {isOwner && <MenuItem onClick={onClickDelete}>{'Delete'}</MenuItem>}
            {!isOwner && <MenuItem onClick={onClickCopy}>{'Copy'}</MenuItem>}
          </MoreButton>
        }
      />
      <Subheading>
        <SubheadingItem
          label={'Source:'}
          labelProps={{ className: classes.label }}
        >
          <Source {...{ recipe, isOwner, includePage: true }} />
        </SubheadingItem>
        {prep_time && (
          <SubheadingItem
            label={'Prep:'}
            labelProps={{ className: classes.label }}
          >
            <Time time={prep_time} />
          </SubheadingItem>
        )}
        {cook_time && (
          <SubheadingItem
            label={'Cook:'}
            labelProps={{ className: classes.label }}
          >
            <Time time={cook_time} />
          </SubheadingItem>
        )}
        {serves && (
          <SubheadingItem
            label={'Serves:'}
            labelProps={{ className: classes.label }}
          >
            {serves}
          </SubheadingItem>
        )}
      </Subheading>
      <Tags {...{ tags }} />
      <Divider className={classes.divider} />
      <Content
        notes={notes}
        ingredients={<Ingredients ingredients={ingredients} />}
        preparation={<Preparation preparation={preparation} />}
      />
      <FabButton {...{ isOwner, isLoggedIn, onClickEdit, onClickCopy }} />
    </AppContent>
  );
}

export default withStyles(styles)(ViewPres);
