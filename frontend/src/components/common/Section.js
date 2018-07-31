import React from 'react';
import classNames from 'classnames';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  withStyles,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

const styles = () => ({
  root: {},
  expansionDetails: {
    display: 'block',
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
        <Typography variant={'subheading'}>{title}</Typography>
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
