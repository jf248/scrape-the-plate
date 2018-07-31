import React from 'react';
import { ButtonBase, Card, Typography, withStyles } from '@material-ui/core';

import { Source, Time, SubheadingItem } from 'components/common';

const styles = theme => ({
  root: {
    display: 'flex',
    flexFlow: 'column nowrap',
    height: '150px',
    maxWidth: '300px',
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
  description: {},
  title: {
    marginBottom: '24px',
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

function ListItem(props) {
  const { classes, recipe, onClick } = props;

  const { title, prep_time, cook_time, notes, preparation } = recipe;

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
          </div>
          <Typography variant={'body1'} className={classes.description}>
            {notes || preparation.join('\n')}
          </Typography>
        </div>
      </ButtonBase>
    </Card>
  );
}

export default withStyles(styles)(ListItem);
