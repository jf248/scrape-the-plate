import React from 'react';
import {
  ButtonBase,
  Card,
  CardContent,
  Typography,
  withStyles,
} from '@material-ui/core';

import { Source, Time, SubheadingItem } from 'components/utils';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
    flex: '1 1 auto',
    maxWidth: '300px',
    height: '150px',
    display: 'flex',
  },
  button: {
    flex: 1,
    display: 'flex',
    height: 'inherit',
    maxWidth: 'inherit',
    flexFlow: 'column nowrap',
    textAlign: 'initial',

    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  description: {
    flex: '1 1 0',
    overflow: 'hidden',
    marginBottom: '24px',
    paddingTop: '0px',
  },
  title: {
    maxWidth: 'inherit',
  },
  oneLine: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

ListItem.defaultProps = {
  recipe: {},
};

function ListItem(props) {
  const { classes, recipe, onClick } = props;

  const { title, prep_time, cook_time, notes, preparation } = recipe;

  return (
    <Card className={classes.root}>
      <ButtonBase className={classes.button} onClick={onClick}>
        <CardContent className={classes.title}>
          <Typography variant={'body2'} className={classes.oneLine}>
            {title}
          </Typography>
          <Typography variant={'caption'} className={classes.oneLine}>
            <Source recipe={recipe} />
          </Typography>
          <Typography variant={'caption'} className={classes.oneLine}>
            {prep_time && (
              <SubheadingItem halfMargin label={'Prep'}>
                <Time time={prep_time} />
              </SubheadingItem>
            )}
            {cook_time && (
              <SubheadingItem halfMargin label={'Cook'}>
                <Time time={cook_time} />
              </SubheadingItem>
            )}
            {prep_time && (
              <SubheadingItem halfMargin label={'Prep'}>
                <Time time={prep_time} />
              </SubheadingItem>
            )}
            {cook_time && (
              <SubheadingItem halfMargin label={'Cook'}>
                <Time time={cook_time} />
              </SubheadingItem>
            )}
          </Typography>
        </CardContent>
        <CardContent className={classes.description}>
          <Typography variant={'body1'}>
            {notes || preparation.join('\n')}
          </Typography>
        </CardContent>
      </ButtonBase>
    </Card>
  );
}

export default withStyles(styles)(ListItem);
