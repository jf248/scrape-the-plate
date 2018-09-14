import React from 'react';
import classNames from 'classnames';
import * as Mui from '@material-ui/core';
import * as MuiIcons from '@material-ui/icons';

const styles = {
  wrapper: {
    position: 'relative',
  },
  root: {
    position: 'relative',
    '@media print': {
      display: 'none',
    },
  },
  flexGrow: {
    flex: '1',
  },
  menuButton: {
    marginLeft: -12,
  },
  title: {
    width: '140px',
  },
  oneLine: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
};

AppBar.defaultProps = {
  variant: 'default',
};

function AppBar(props) {
  const {
    classes,
    className: classNameProp,
    left,
    onMenuClick,
    progress,
    right,
    title,
    variant,
    ...rest
  } = props;
  const className = classNames(classNameProp, classes.root);

  return (
    <Mui.AppBar
      className={className}
      color={variant === 'back' ? 'default' : 'primary'}
      {...rest}
    >
      <Mui.Toolbar>
        <Mui.IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={onMenuClick}
        >
          {variant === 'back' ? <MuiIcons.ArrowBack /> : <MuiIcons.Menu />}
        </Mui.IconButton>
        <Mui.Typography
          variant="title"
          color="inherit"
          className={classNames(classes.title, classes.oneLine)}
        >
          {variant === 'back' ? 'Back' : title}
        </Mui.Typography>
        <div className={classNames(classes.flexGrow)}>{left}</div>
        {progress}
        {right}
      </Mui.Toolbar>
    </Mui.AppBar>
  );
}

export default Mui.withStyles(styles)(AppBar);
