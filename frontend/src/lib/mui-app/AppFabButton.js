import React from 'react';
import classNames from 'classnames';
import { Button, Tooltip, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ModeEdit, Add, InsertDriveFile } from '@material-ui/icons';

const styles = theme => ({
  wrapper: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  fab: {},
});

AppFabButton.defaultProps = {
  buttonProps: {},
  tooltipProps: {},
  variant: 'edit',
};

function AppFabButton(props) {
  const {
    buttonProps: buttonPropsProp,
    classes,
    onClick,
    to,
    tooltipProps: tooltipPropsProp,
    variant: variantProp,
  } = props;

  const variants = {
    edit: {
      title: 'Edit',
      icon: <ModeEdit />,
    },
    add: {
      title: 'New',
      icon: <Add />,
    },
    copy: {
      title: 'Copy',
      icon: <InsertDriveFile />,
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
    color: 'secondary',
    component,
    onClick,
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
