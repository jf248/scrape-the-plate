import React, { Component } from 'react';
import { IconButton, Paper, withStyles } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

import { Field } from 'components/common';
import { splitLines } from 'utils';

const styles = theme => {
  const transition = {
    duration: theme.transitions.duration.shortest,
    easing: theme.transitions.easing.ease,
  };

  return {
    textField: {
      flex: '1 1 auto',
    },
    root: {
      alignItems: 'center',
      display: 'flex',
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
  };
};

class Ingredient extends Component {
  static defaultProps = {
    item: {},
  };

  render() {
    const {
      item,
      blankItem,
      onChange,
      onRemove,
      onBlur,
      classes,
      orphan,
    } = this.props;

    const handleTextChange = event => {
      if (event.target.value === '') {
        onChange(blankItem);
      } else {
        const split = splitLines(event.target.value);
        const newItems = split.map(x => ({ ...blankItem, text: x }));
        newItems[0] = { ...item, ...newItems[0] };
        onChange(newItems);
      }
    };

    const handleBlur = event => {
      if (!event.target.value) {
        onRemove();
      } else {
        onBlur();
      }
    };

    // We use a multiline input to allow pasting in multiple ingredients at
    // once. We prevent user creating a line break, by pressing Enter, when typing.
    const handleKeyDown = event => {
      if (event.key && event.key === 'Enter') {
        event.preventDefault();
      }
    };

    /*
    const helperText = last ? null : (
      <span>
        No matched grocery item. <Link>Edit</Link>
      </span>
    );
    */

    const placeholder = orphan
      ? 'Add some ingredients'
      : 'Add another ingredient';

    /* (create-react-app eslint rule incorrectly flagging inputProps and InputProps as dublicate props.) */
    /* eslint-disable react/jsx-no-duplicate-props */
    return (
      <Paper elevation={1} square className={classes.root}>
        <Field
          InputProps={{ disableUnderline: true }}
          className={classes.textField}
          inputRef={x => (this.input = x)}
          multiline
          rows={1}
          onBlur={handleBlur}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          value={item.text || ''}
        />
        {item.text && (
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
    /* eslint-disable react/jsx-no-duplicate-props */
  }
}

export default withStyles(styles)(Ingredient);
