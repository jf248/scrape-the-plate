import React from 'react';
import {
  IconButton,
  Divider,
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core';
import { MoreVert, Restaurant } from '@material-ui/icons';

import { AppContent } from 'lib/mui-app';
import { Link } from 'lib/mui-components';

import FabButton from './FabButton';

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
});

function ViewPres(props) {
  const { classes, record = {} } = props;
  const { id, title, ingredients, preparation, source, url } = record;
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
        <IconButton className={classes.icon}>
          <MoreVert />
        </IconButton>
      </div>
      <div>
        {source && (
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <Restaurant color={'disabled'} />
            <Typography variant={'subheading'}>
              <Link
                className={classes.source}
                target={'_blank'}
                onClick={event => event.stopPropagation()}
                href={url}
              >
                {source && source.name}
              </Link>
            </Typography>
          </span>
        )}
      </div>

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
      <FabButton variant={'edit'} to={`/recipes/${id}/edit`} />
    </AppContent>
  );
}

export default withStyles(styles)(ViewPres);
