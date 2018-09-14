import React from 'react';
import classNames from 'classnames';
import * as Mui from '@material-ui/core';
import * as MuiIcons from '@material-ui/icons';
import { fade } from '@material-ui/core/styles/colorManipulator'; // eslint-disable-line import/no-internal-modules

const styles = theme => ({
  wrapper: {
    display: 'flex',
  },
  flexGrow: {
    flex: '1',
  },
  root: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

function SearchPres(props) {
  const { classes, className, onSubmit, ...rest } = props;

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      onSubmit && onSubmit(event.target.value);
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classNames(classes.root, className)} {...rest}>
        <div className={classes.searchIcon}>
          <MuiIcons.Search />
        </div>
        <Mui.Input
          placeholder={'Search...'}
          inputProps={{
            onKeyPress: handleKeyPress,
          }}
          disableUnderline
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          {...rest}
        />
      </div>
      <div className={classes.flexGrow} />
    </div>
  );
}

export default Mui.withStyles(styles)(SearchPres);
