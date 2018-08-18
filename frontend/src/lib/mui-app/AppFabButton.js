import React from 'react';
import classNames from 'classnames';
import { Button, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ModeEdit, Add, InsertDriveFile } from '@material-ui/icons';

const styles = theme => ({
  fixedWrapper: {
    position: 'fixed',
    bottom: '0%',
    right: '0%',
    width: '100%',
    display: 'flex',
  },
  centerWrapper: {
    flex: '1 1 100%',
    margin: '0 auto 32px auto',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      maxWidth: '996px',
    },
    padding: '0px 24px 0px 24px',
  },
  floatWrapper: {
    float: 'right',
  },
  fab: {
    '@media print': {
      display: 'none',
    },
  },
});

AppFabButton.defaultProps = {
  buttonProps: {},
  variant: 'edit',
};

function AppFabButton(props) {
  const {
    buttonProps: buttonPropsProp,
    classes,
    onClick,
    to,
    variant: variantProp,
    extendedText,
  } = props;

  const variants = {
    edit: {
      title: 'Edit',
      icon: ModeEdit,
    },
    add: {
      title: 'New',
      icon: Add,
    },
    copy: {
      title: 'Copy',
      icon: InsertDriveFile,
    },
  };

  const variant = variants[variantProp];
  const Icon = variant.icon;

  const component = to && (props => <Link to={to} {...props} />);

  const buttonProps = {
    variant: extendedText ? 'extendedFab' : 'fab',
    color: 'secondary',
    component,
    onClick,
    ...buttonPropsProp,
    className: classNames(classes.fab, buttonPropsProp.className),
  };

  return (
    <div className={classes.fixedWrapper}>
      <div className={classes.centerWrapper}>
        <div className={classes.floatWrapper}>
          <Button {...buttonProps}>
            <Icon />
            {extendedText}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(AppFabButton);
