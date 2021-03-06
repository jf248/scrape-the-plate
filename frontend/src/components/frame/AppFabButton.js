import React from 'react';
import classNames from 'classnames';
import * as Mui from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import Add from '@material-ui/icons/Add';
import FileCopy from '@material-ui/icons/FileCopy';

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
    variant: variantProp,
    extendedText,
    tooltipTitle: tooltipTitleProp,
  } = props;

  const variants = {
    edit: {
      tooltipTitle: 'Edit',
      icon: Edit,
    },
    add: {
      tooltipTitle: 'New',
      icon: Add,
    },
    copy: {
      tooltipTitle: 'Copy',
      icon: FileCopy,
    },
  };

  const variant = variants[variantProp];
  const tooltipTitle = tooltipTitleProp || variant.tooltipTitle;
  const Icon = variant.icon;

  const buttonProps = {
    variant: extendedText ? 'extendedFab' : 'fab',
    color: 'secondary',
    onClick,
    ...buttonPropsProp,
    className: classNames(classes.fab, buttonPropsProp.className),
  };

  return (
    <div className={classes.fixedWrapper}>
      <div className={classes.centerWrapper}>
        <div className={classes.floatWrapper}>
          <Mui.Tooltip title={tooltipTitle}>
            <div>
              <Mui.Button {...buttonProps}>
                <Icon />
                {extendedText}
              </Mui.Button>
            </div>
          </Mui.Tooltip>
        </div>
      </div>
    </div>
  );
}

export default Mui.withStyles(styles)(AppFabButton);
