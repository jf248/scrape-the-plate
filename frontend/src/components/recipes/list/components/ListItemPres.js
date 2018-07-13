import React from 'react';
import {
  ButtonBase,
  Card,
  CardHeader,
  CardContent,
  Typography,
  withStyles,
} from '@material-ui/core';

import { Link } from 'lib/mui-components';
import { formatMins } from 'utils';

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

ListItemPres.defaultProps = {
  item: {},
};

function ListItemPres(props) {
  const { classes, item, push } = props;

  const {
    id,
    title,
    description,
    preparation,
    source,
    prep_time,
    cook_time,
    url,
  } = item;

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

  const getSubheader = () => {
    const formatLabel = ([title, content]) => {
      if (!content) {
        return null;
      }

      const formattedTitle = <span>{`${title} `}</span>;
      return (
        <span style={{ fontSize: '12px' }}>
          {title && formattedTitle}
          {`${content}`}
        </span>
      );
    };

    const formatLabels = labels => {
      return labels.map(label => formatLabel(label));
    };

    const labels = formatLabels([
      ['Prep', prep_time && formatMins(prep_time)],
      ['Cook', cook_time && formatMins(cook_time)],
    ]).filter(label => !!label);

    const last = labels.length - 1;
    return (
      <React.Fragment>
        {source && (
          <React.Fragment>
            <Link
              target={'_blank'}
              onClick={event => event.stopPropagation()}
              href={url}
            >
              {source.name}
            </Link>
            <br />
          </React.Fragment>
        )}
        <span>
          {labels.map((label, index) => (
            <React.Fragment key={index}>
              {label}
              {index !== last && <b>{' \u00b7 '}</b>}
            </React.Fragment>
          ))}
        </span>
      </React.Fragment>
    );
  };

  const handleClick = () => push(`/recipes/${id}`);
  return (
    <Card className={classes.card}>
      <ButtonBase
        focusRipple
        onClick={handleClick}
        className={classes.cardAction}
      >
        <CardHeader
          classes={{
            title: classes.title,
          }}
          title={title}
          subheader={getSubheader()}
        />
        {renderContent()}
      </ButtonBase>
    </Card>
  );
}

export default withStyles(styles)(ListItemPres);
