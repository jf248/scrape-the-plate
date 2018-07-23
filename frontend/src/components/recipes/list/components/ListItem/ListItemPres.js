import React from 'react';
import { ButtonBase, Card, CardHeader, withStyles } from '@material-ui/core';

import CardContent from './CardContent';
import Subheader from './Subheader';

const styles = theme => ({
  root: {},
  cardAction: {
    display: 'block',
    textAlign: 'initial',
  },
  card: {
    width: '200px',
    height: '150px',
    margin: theme.spacing.unit,
  },
  title: {
    ...theme.typography.body2,
    height: '48px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  subheader: {
    height: '20px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

ListItemPres.defaultProps = {
  item: {},
};

function ListItemPres(props) {
  const { classes, item, isOwner, onClick } = props;

  const { title } = item;

  return (
    <Card className={classes.card}>
      <ButtonBase focusRipple onClick={onClick} className={classes.cardAction}>
        <CardHeader
          classes={{
            title: classes.title,
          }}
          title={title}
          subheader={<Subheader {...{ item, isOwner }} />}
        />
        <CardContent {...{ item }} />
      </ButtonBase>
    </Card>
  );
}

export default withStyles(styles)(ListItemPres);
