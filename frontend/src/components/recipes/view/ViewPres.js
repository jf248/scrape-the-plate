import React from 'react';
import { Divider, Grid, Typography, withStyles } from '@material-ui/core';

import { AppContent } from 'lib/mui-app';
import { Link } from 'lib/mui-components';

import { formatMins } from 'utils';
import FabButton from './FabButton';
import { SubheadingLabel } from 'components/utils';
import MoreButton from './MoreButton';

const styles = theme => ({
  source: {},
  titleWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  title: {
    flex: '1 1 0',
  },
  icon: {},
  fontIcon: {
    display: 'inline',
  },
  step: {
    paddingBottom: theme.spacing.unit * 2,
  },
  ingredient: {
    paddingBottom: theme.spacing.unit,
  },
  divider: {
    marginBottom: theme.spacing.unit * 4,
  },
  subheading: {},
});

ViewPres.default = {
  record: {},
};

function ViewPres(props) {
  const {
    classes,
    isLoggedIn,
    isOwner,
    onCopy,
    onDelete,
    onEdit,
    openLoginModal,
    record,
  } = props;
  const {
    title,
    ingredients,
    preparation,
    source,
    url,
    prep_time,
    cook_time,
  } = record;
  const ingredientItems =
    ingredients &&
    ingredients.map((ingredient, index) => (
      <div key={index} className={classes.ingredient}>
        <Typography variant={'body2'}>{ingredient.text}</Typography>
      </div>
    ));

  const preparationSteps =
    preparation &&
    preparation.map((step, index) => (
      <div key={index} className={classes.step}>
        <Typography variant={'body2'}>{`Step ${index + 1}`}</Typography>
        <Typography variant={'subheading'}>{step}</Typography>
      </div>
    ));

  return (
    <AppContent>
      <div className={classes.titleWrapper}>
        <Typography className={classes.title} variant={'display1'}>
          {title}
        </Typography>
        <MoreButton
          {...{ isLoggedIn, isOwner, openLoginModal, onEdit, onDelete, onCopy }}
        />
      </div>
      <Typography
        className={classes.subheading}
        variant={'subheading'}
        color={'textSecondary'}
      >
        {source && (
          <SubheadingLabel
            label={'Source'}
            content={
              <Link
                target={'_blank'}
                onClick={event => event.stopPropagation()}
                href={url}
              >
                {source.name}
              </Link>
            }
          />
        )}
        {prep_time && (
          <SubheadingLabel
            label={'Prep time'}
            content={`${formatMins(prep_time)}`}
          />
        )}
        {cook_time && (
          <SubheadingLabel
            label={'Cook time'}
            content={`${formatMins(cook_time)}`}
          />
        )}
      </Typography>

      <Divider className={classes.divider} />
      <Grid container spacing={32}>
        <Grid item xs={12} sm={4}>
          <Typography variant={'title'} paragraph>
            Ingredients
          </Typography>
          {ingredientItems}
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant={'title'} paragraph>
            Preparation
          </Typography>
          {preparationSteps}
        </Grid>
      </Grid>
      <FabButton {...{ isLoggedIn, onEdit, onCopy }} />
    </AppContent>
  );
}

export default withStyles(styles)(ViewPres);
