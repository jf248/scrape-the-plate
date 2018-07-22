import React from 'react';
import {
  CardContent as MuiCardContent,
  Typography,
  withStyles,
} from '@material-ui/core';

const styles = () => ({
  root: {
    height: '80px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

function CardContent(props) {
  const { classes, item } = props;

  const { description, preparation } = item;

  const renderContent = () => {
    if (description) {
      return <Typography component={'p'}>{description}</Typography>;
    } else {
      return (
        preparation &&
        preparation.map((step, index) => (
          <Typography component={'p'} key={index}>
            {step.text}
          </Typography>
        ))
      );
    }
  };

  return (
    <MuiCardContent className={classes.root}>{renderContent()}</MuiCardContent>
  );
}

export default withStyles(styles)(CardContent);
