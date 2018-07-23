import React from 'react';
import { Divider, Grid, Typography, withStyles } from '@material-ui/core';

import { AppContent } from 'lib/mui-app';

import { formatMins } from 'utils';
import FabButton from './FabButton';
import { SubheadingLabel, Source } from 'components/utils';
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
  label: {
    color: theme.typography.subheading.color,
  },
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
    onOpenLoginModal,
    record,
  } = props;
  const {
    title,
    ingredients,
    preparation,
    source,
    book,
    page,
    user,
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
        <Typography className={classes.title} variant={'display1'} paragraph>
          {title}
        </Typography>
        <MoreButton
          {...{
            isLoggedIn,
            isOwner,
            onOpenLoginModal,
            onEdit,
            onDelete,
            onCopy,
          }}
        />
      </div>
      <Typography
        className={classes.subheading}
        variant={'subheading'}
        color={'textSecondary'}
      >
        <SubheadingLabel>
          <span className={classes.label}>{'Source '}</span>
          <Source
            {...{ source, url, book, page, user, isOwner, includePage: true }}
          />
        </SubheadingLabel>
        {prep_time && (
          <SubheadingLabel>
            <span className={classes.label}>{'Prep '}</span>
            {`${formatMins(prep_time)}`}
          </SubheadingLabel>
        )}
        {cook_time && (
          <SubheadingLabel>
            <span className={classes.label}>{'Cook '}</span>
            {`${formatMins(cook_time)}`}
          </SubheadingLabel>
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
