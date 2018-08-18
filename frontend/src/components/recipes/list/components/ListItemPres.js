import React from 'react';
import { ButtonBase, Card, Typography, withStyles } from '@material-ui/core';

import { Source, Time, SubheadingItem } from 'components/common';
import Tags from './Tags';

const styles = theme => ({
  root: {
    flex: '0 0 auto',
    margin: theme.spacing.unit,
    display: 'flex',
    flexFlow: 'column nowrap',
    height: '150px',
    width: '300px',
  },
  button: {
    display: 'block',
    flex: 1,
    overflow: 'hidden',
    textAlign: 'initial',
    verticalAlign: 'top',
    position: 'relative',
    marginBottom: '16px',
  },
  wrapper: {
    top: 0,
    left: 0,
    position: 'absolute',
    width: '100%',
    height: '100%',
    padding: '16px 24px 0 24px',
  },
  title: {
    marginBottom: '8px',
    height: '72px',
  },
  oneLine: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
});

ListItem.defaultProps = {
  recipe: {},
};

function ListItem({ classes, recipe, onClick }) {
  const { cook_time, notes, prep_time, preparation, tags, title } = recipe;

  if (!recipe) {
    return null;
  }

  return (
    <Card className={classes.root}>
      <ButtonBase className={classes.button} onClick={onClick}>
        <div className={classes.wrapper}>
          <div className={classes.title}>
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
            </Typography>
            <Typography variant={'caption'} className={classes.oneLine}>
              <Tags {...{ tags }} />
            </Typography>
          </div>
          <Typography variant={'body1'}>
            {notes || (preparation && preparation.join('\n'))}
          </Typography>
        </div>
      </ButtonBase>
    </Card>
  );
}

export default withStyles(styles)(ListItem);
