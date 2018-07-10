import React from 'react';
import { Divider, Grid, Typography, withStyles } from '@material-ui/core';

import { AppContent, AppFabButton } from 'lib/mui-app';

const styles = theme => ({
  step: {
    paddingBottom: theme.spacing.unit * 2,
  },
  ingredient: {
    paddingBottom: theme.spacing.unit,
  },
  divider: {
    marginBottom: theme.spacing.unit * 4,
  },
});

function ViewPres(props) {
  const { classes, record = {} } = props;
  const { id, title, ingredients, preparation } = record;
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
      <Typography variant={'display1'}>{title}</Typography>
      <Divider className={classes.divider} />
      <Grid container>
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
      <AppFabButton variant={'edit'} to={`/recipes/${id}/edit`} />
    </AppContent>
  );
}

export default withStyles(styles)(ViewPres);
