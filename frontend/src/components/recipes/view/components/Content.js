import React from 'react';
import classNames from 'classnames';
import { Grid, Typography, withStyles } from '@material-ui/core';

const styles = () => ({
  root: {},
});

Content.defaultProps = {};

function Content(props) {
  const {
    classes,
    className: classNameProp,
    ingredients,
    preparation,
    notes,
    ...rest
  } = props;

  const className = classNames(classes.root, classNameProp);

  return (
    <Grid className={className} container spacing={32} {...rest}>
      {notes && (
        <Grid item sm={12}>
          <Typography variant={'body1'}>{notes}</Typography>
        </Grid>
      )}
      <Grid item xs={12} sm={4}>
        <Typography variant={'title'} paragraph>
          Ingredients
        </Typography>
        {ingredients}
      </Grid>
      <Grid item xs={12} sm={8}>
        <Typography variant={'title'} paragraph>
          Preparation
        </Typography>
        {preparation}
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(Content);
