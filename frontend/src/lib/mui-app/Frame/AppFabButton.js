import React from 'react';
import classNames from 'classnames';
import { Button, Tooltip, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ModeEdit as EditIcon, Add as AddIcon } from '@material-ui/icons';

const styles = theme => ({
  outerContainer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
  },
  innerContainer: {
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    padding: '0px 16px',
    justifyContent: 'flex-end',
    [theme.breakpoints.up('md')]: {
      maxWidth: '932px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0px 24px',
    },
  },
  fab: {
    margin: theme.spacing.unit * 2,
  },
});

AppFabButton.defaultProps = {
  variant: 'edit',
  buttonProps: {},
  tooltipProps: {},
};

function AppFabButton(props) {
  const {
    classes,
    tooltipProps: tooltipPropsProp,
    buttonProps: buttonPropsProp,
    variant: variantProp,
    to,
  } = props;

  const variants = {
    edit: {
      title: 'Edit',
      icon: <EditIcon />,
    },
    add: {
      title: 'New',
      icon: <AddIcon />,
    },
  };

  const variant = variants[variantProp];

  const tooltipProps = {
    id: 'tooltip-fab',
    title: variant.title,
    placement: 'left',
    ...tooltipPropsProp,
  };

  const component = to && (props => <Link to={to} {...props} />);

  const buttonProps = {
    variant: 'fab',
    color: 'primary',
    component,
    ...buttonPropsProp,
    className: classNames(classes.fab, buttonPropsProp.className),
  };

  return (
    <div className={classes.outerContainer}>
      <div className={classes.innerContainer}>
        <Tooltip {...tooltipProps}>
          <Button {...buttonProps}>{variant.icon}</Button>
        </Tooltip>
      </div>
    </div>
  );
}

export default withStyles(styles)(AppFabButton);
