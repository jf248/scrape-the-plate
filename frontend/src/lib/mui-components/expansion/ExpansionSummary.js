import React from 'react';
import classNames from 'classnames';
import { ButtonBase, IconButton, withStyles } from '@material-ui/core';

export const styles = theme => {
  const transition = {
    duration: theme.transitions.duration.shortest,
    easing: theme.transitions.easing.ease,
  };
  return {
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      minHeight: theme.spacing.unit * 6,
      transition: theme.transitions.create(['min-height'], transition),
      position: 'relative',
      borderStyle: 'solid',
      borderWidth: '0px 0px 1px 0px',
      borderColor: theme.palette.divider,
      '&:hover': {
        cursor: 'pointer',
      },
    },
    expanded: {
      minHeight: 64,
      border: 'none',
    },
    content: {
      display: 'flex',
      flexGrow: 1,
      transition: theme.transitions.create(['margin'], transition),
      margin: '12px 0',
      '& > :last-child': {
        paddingRight: theme.spacing.unit * 4,
      },
    },
    contentExpanded: {
      margin: '20px 0',
    },
    expandIcon: {
      position: 'absolute',
      top: '50%',
      right: theme.spacing.unit,
      transform: 'translateY(-50%) rotate(0deg)',
      transition: theme.transitions.create('transform', transition),
    },
    expandIconExpanded: {
      transform: 'translateY(-50%) rotate(180deg)',
    },
  };
};

ExpansionSummary.defaultProps = {};

function ExpansionSummary(props) {
  const {
    children,
    classes,
    className,
    expanded,
    expandIcon,
    onChange,
    onClick,
    ...rest
  } = props;

  const handleChange = event => {
    if (onChange) {
      onChange(event);
    }
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <ButtonBase
      focusRipple={false}
      disableRipple
      component="div"
      aria-expanded={expanded}
      className={classNames(
        classes.root,
        {
          [classes.expanded]: expanded,
        },
        className
      )}
      {...rest}
      onClick={handleChange}
    >
      <div
        className={classNames(classes.content, {
          [classes.contentExpanded]: expanded,
        })}
      >
        {children}
      </div>
      {expandIcon && (
        <IconButton
          className={classNames(classes.expandIcon, {
            [classes.expandIconExpanded]: expanded,
          })}
          component="div"
          tabIndex="-1"
          aria-hidden="true"
        >
          {expandIcon}
        </IconButton>
      )}
    </ButtonBase>
  );
}

export default withStyles(styles)(ExpansionSummary);
