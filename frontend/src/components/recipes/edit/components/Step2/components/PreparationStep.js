import React, { Component } from 'react';
import { IconButton, Typography, Paper, withStyles } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

import { TextField } from 'lib/mui-components';
import { splitLines } from 'utils';

const styles = theme => {
  const transition = {
    duration: theme.transitions.duration.shortest,
    easing: theme.transitions.easing.ease,
  };

  return {
    content: {
      flexGrow: 1,
    },
    input: {
      overflow: 'hidden',
    },
    textField: {
      flex: '1 1 100%',
    },
    root: {
      alignItems: 'center',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      margin: 0,
      padding: `0${theme.spacing.unit}px ${theme.spacing.unit * 3}px`,
      position: 'relative',
      transition: theme.transitions.create(['margin'], transition),
      '&:before': {
        position: 'absolute',
        left: 0,
        top: -1,
        right: 0,
        height: 1,
        content: '""',
        opacity: 1,
        backgroundColor: theme.palette.divider,
        transition: theme.transitions.create(
          ['opacity', 'background-color'],
          transition
        ),
      },
      '&:first-child': {
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        '&:before': {
          display: 'none',
        },
      },
      '&:last-child': {
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
      },
    },
    removeButton: {},
    stepTitle: {
      flex: '1 1 100%',
      textTransform: 'uppercase',
    },
  };
};

class PreparationStep extends Component {
  static defaultProps = {
    step: {},
  };

  render() {
    const {
      index,
      item,
      onChange,
      onRemove,
      classes,
      last,
      orphan,
    } = this.props;

    const handleTextChange = event => {
      const split = splitLines(event.target.value);
      onChange(split);
    };

    const handleBlur = event => {
      if (!event.target.value) {
        onRemove();
      }
    };

    // We use a multiline input to allow pasting in multiple ingredients at
    // once. We prevent user creating a line break, by pressing Enter, when typing.
    const handleKeyDown = event => {
      if (event.key && event.key === 'Enter') {
        event.preventDefault();
      }
    };

    const placeholder = orphan
      ? 'Add some preparation steps'
      : 'Add another step';

    const stepTitle = `Step ${index + 1}`;

    /* (create-react-app eslint rule incorrectly flagging inputProps and InputProps as dublicate props.) */
    /* eslint-disable react/jsx-no-duplicate-props */
    return (
      <Paper elevation={1} square className={classes.root}>
        <div className={classes.content}>
          {!last && (
            <Typography
              className={classes.stepTitle}
              component={'div'}
              gutterBottom
              variant={'caption'}
            >
              {stepTitle}
            </Typography>
          )}
          <TextField
            className={classes.textField}
            fullWidth
            InputProps={{ disableUnderline: true }}
            inputProps={{ className: classes.input }}
            inputRef={x => (this.input = x)}
            multiline
            onBlur={handleBlur}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            value={item || ''}
          />
        </div>
        {item && (
          <IconButton
            aria-hidden="true"
            className={classes.removeButton}
            component="div"
            onClick={onRemove}
            tabIndex="-1"
          >
            <CloseIcon />
          </IconButton>
        )}
      </Paper>
    );
    /* eslint-enable react/jsx-no-duplicate-props */
  }
}

export default withStyles(styles)(PreparationStep);
