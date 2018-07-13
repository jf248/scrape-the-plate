import React from 'react';
import classNames from 'classnames';
import { Button, Tooltip, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ModeEdit as EditIcon, Add as AddIcon } from '@material-ui/icons';

const styles = theme => ({
  wrapper: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  fab: {
  }
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
    placement: 'top',
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
        <Tooltip {...tooltipProps}>
          <div className={classes.wrapper}>
          <Button {...buttonProps}>{variant.icon}</Button>
          </div>
        </Tooltip>
  );
}

export default withStyles(styles)(AppFabButton);
