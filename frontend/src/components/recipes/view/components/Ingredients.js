import React from 'react';
import classNames from 'classnames';
import { Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    paddingBottom: theme.spacing.unit,
  },
});

Ingredients.defaultProps = {
  ingredients: [],
};

function Ingredients(props) {
  const { classes, className: classNameProp, ingredients, ...rest } = props;

  const className = classNames(classes.root, classNameProp);

  return (
    <React.Fragment>
      {ingredients.map((ingredient, index) => (
        <div key={index} className={className} {...rest}>
          <Typography variant={'body2'}>{ingredient.text}</Typography>
        </div>
      ))}
    </React.Fragment>
  );
}

export default withStyles(styles)(Ingredients);
