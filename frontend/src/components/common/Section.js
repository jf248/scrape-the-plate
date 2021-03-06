import React from 'react';
import classNames from 'classnames';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  withStyles,
} from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore';

const styles = () => ({
  root: {},
  summary: {
    display: 'flex',
    alignItems: 'baseline',
  },
  expansionDetails: {
    display: 'block',
  },
  error: {
    paddingLeft: '8px',
  },
});

Section.defaultProps = {};

function Section(props) {
  const {
    caption,
    children,
    classes,
    className: classNameProp,
    defaultExpanded,
    title,
    error,
    ...rest
  } = props;

  const className = classNames(classes.root, classNameProp);

  return (
    <ExpansionPanel
      className={className}
      defaultExpanded={defaultExpanded}
      {...rest}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
        <div className={classes.summary}>
          <Typography
            variant={'subheading'}
            color={error ? 'error' : 'default'}
          >
            {title}
          </Typography>
          {error && (
            <Typography
              variant={'caption'}
              color={'error'}
              className={classes.error}
            >
              {'Errors in this section'}
            </Typography>
          )}
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.expansionDetails}>
        {caption && (
          <Typography variant={'caption'} paragraph>
            {caption}
          </Typography>
        )}
        {children}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default withStyles(styles)(Section);
