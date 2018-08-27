import React, { Component } from 'react';
import * as Mui from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

import * as utils from 'utils';
import * as Common from 'components/common';
import GroceryMatch from './GroceryMatch';

const styles = theme => {
  const transition = {
    duration: theme.transitions.duration.shortest,
    easing: theme.transitions.easing.ease,
  };

  return {
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
    block: {
      display: 'block',
    },
    grow: {
      flexGrow: 1,
    },
  };
};

class Ingredient extends Component {
  static defaultProps = {
    item: {},
  };

  getSelectedItems = () => this.props.item.grocery_item;

  render() {
    const {
      blankItem,
      classes,
      item,
      onBlur,
      onChange,
      onOpenWithProps,
      onRemove,
      orphan,
      error,
    } = this.props;

    const { text, grocery_item } = item;

    const handleTextChange = event => {
      if (event.target.value === '') {
        onChange(blankItem);
      } else {
        const split = utils.splitLines(event.target.value);
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

    const handleChangeGroceryClick = () =>
      onOpenWithProps({
        getSelectedItems: this.getSelectedItems,
        onChange: grocery_item => {
          onChange({ ...item, grocery_item });
        },
      });

    const placeholder = orphan
      ? 'Add some ingredients'
      : 'Add another ingredient';

    /* (create-react-app eslint rule incorrectly flagging inputProps and InputProps as dublicate props.) */
    /* eslint-disable react/jsx-no-duplicate-props */
    return (
      <Mui.Paper elevation={1} square className={classes.root}>
        <Common.FlexContainer className={classes.grow}>
          <Common.FlexGrow className={classes.block}>
            <Common.Field
              InputProps={{ disableUnderline: true }}
              multiline
              onBlur={handleBlur}
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              value={text || ''}
              fullWidth
            />
            <GroceryMatch
              {...{
                onChangeGroceryClick: handleChangeGroceryClick,
                ingredientText: text,
                item: grocery_item,
              }}
            />
            {error && (
              <Mui.Typography variant={'caption'} color={'error'}>
                {utils.formatApiError(error)}
              </Mui.Typography>
            )}
          </Common.FlexGrow>
          <Common.FlexShrink>
            {text && (
              <Mui.IconButton
                aria-hidden="true"
                component="div"
                onClick={onRemove}
                tabIndex="-1"
              >
                <CloseIcon />
              </Mui.IconButton>
            )}
          </Common.FlexShrink>
        </Common.FlexContainer>
      </Mui.Paper>
    );
    /* eslint-disable react/jsx-no-duplicate-props */
  }
}

export default Mui.withStyles(styles)(Ingredient);
