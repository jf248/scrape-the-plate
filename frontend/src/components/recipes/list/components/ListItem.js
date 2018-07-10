import React from 'react';
import {
  ButtonBase,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  withStyles,
} from '@material-ui/core';
import { MoreVert as MoreVertIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {},
  card: {
    width: '200px',
    margin: theme.spacing.unit,
  },
  content: {
    height: '80px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
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

ListItem.defaultProps = {
  item: {},
};

function ListItem(props) {
  const { classes, item } = props;

  const { id, title, description, preparation, source } = item;

  const renderContent = () => {
    if (description) {
      return (
        <CardContent className={classes.content}>
          <Typography component={'p'}>{description}</Typography>
        </CardContent>
      );
    } else {
      return (
        <CardContent className={classes.content}>
          {preparation &&
            preparation.map((step, index) => (
              <Typography component={'p'} key={index}>
                {step.text}
              </Typography>
            ))}
        </CardContent>
      );
    }
  };

  const renderLink = props => <Link to={`/recipes/${id}`} {...props} />;

  return (
    <ButtonBase focusRipple component={renderLink} className={classes.root}>
      <Card className={classes.card}>
        <CardHeader
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          classes={{
            title: classes.title,
            subheader: classes.subheader,
          }}
          title={title}
          subheader={source || 'by me'}
        />
        {renderContent()}
      </Card>
    </ButtonBase>
  );
}

export default withStyles(styles)(ListItem);
