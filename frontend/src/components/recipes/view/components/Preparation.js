import React from 'react';
import classNames from 'classnames';
import { Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    paddingBottom: theme.spacing.unit * 2,
  },
});

Preparation.defaultProps = {
  preparation: [],
};

function Preparation(props) {
  const { classes, className: classNameProp, preparation, ...rest } = props;

  const className = classNames(classes.root, classNameProp);

  return (
    <React.Fragment>
      {preparation.map((step, index) => (
        <div key={index} className={className} {...rest}>
          <Typography variant={'body2'}>{`Step ${index + 1}`}</Typography>
          <Typography variant={'subheading'}>{step}</Typography>
        </div>
      ))}
    </React.Fragment>
  );
}

export default withStyles(styles)(Preparation);
