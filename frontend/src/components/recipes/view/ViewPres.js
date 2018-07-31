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
} from './components';

const styles = theme => ({
  divider: {
    marginBottom: theme.spacing.unit * 4,
  },
  label: {
    color: theme.typography.subheading.color,
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
  const { title, ingredients, preparation, prep_time, cook_time } = recipe;

  return (
    <AppContent>
      <Title
        title={title}
        moreButton={
          <MoreButton onClick={onMoreButtonClick}>
            {isOwner && <MenuItem onClick={onClickEdit}>{'Edit'}</MenuItem>}
            {isOwner && <MenuItem onClick={onClickDelete}>{'Delete'}</MenuItem>}
            {!isOwner && <MenuItem onClick={onClickCopy}>{'Copy'}</MenuItem>}
          </MoreButton>
        }
      />
      <Subheading>
        <SubheadingItem
          label={'Source'}
          labelProps={{ className: classes.label }}
        >
          <Source {...{ recipe: recipe, isOwner, includePage: true }} />
        </SubheadingItem>
        {prep_time && (
          <SubheadingItem
            label={'Prep'}
            labelProps={{ className: classes.label }}
          >
            <Time time={prep_time} />
          </SubheadingItem>
        )}
        {cook_time && (
          <SubheadingItem
            label={'Cook'}
            labelProps={{ className: classes.label }}
          >
            <Time time={cook_time} />
          </SubheadingItem>
        )}
      </Subheading>

      <Divider className={classes.divider} />
      <Content
        ingredients={<Ingredients ingredients={ingredients} />}
        preparation={<Preparation preparation={preparation} />}
      />
      <FabButton {...{ isOwner, isLoggedIn, onClickEdit, onClickCopy }} />
    </AppContent>
  );
}

export default withStyles(styles)(ViewPres);
