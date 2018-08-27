import React from 'react';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core';

import InputCursorCorrect from './InputCursorCorrect';

const styles = theme => ({
  inputAndEndWrapper: {
    display: 'flex',
    flex: '1 1 0',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    flex: '1 1 0',
  },
  typeAhead: {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: theme.palette.type === 'light' ? 0.42 : 0.5,
  },
  input: {},
});

InputComponent.defaultProps = {
  minInputWidth: '10px',
};

function InputComponent(props) {
  const {
    className,
    classes,
    endAdornment,
    inputRef,
    minInputWidth,
    multiline,
    typeAheadProps: {
      className: typeAheadClassName,
      ...typeAheadPropsProp
    } = {},
    suggestion,
    startAdornment,
    ...rest
  } = props;

  return (
    <React.Fragment>
      {startAdornment}
      <div
        className={classes.inputAndEndWrapper}
        style={{ minWidth: minInputWidth }}
      >
        <div
          className={classes.inputWrapper}
          style={{ minWidth: minInputWidth }}
        >
          {suggestion && (
            <div
              className={classnames(
                className,
                classes.typeAhead,
                typeAheadClassName
              )}
              {...typeAheadPropsProp}
            >
              {suggestion}
            </div>
          )}
          <InputCursorCorrect
            inputRef={inputRef}
            className={classnames(className, classes.input)}
            style={{ minWidth: minInputWidth }}
            multiline={multiline}
            {...rest}
          />
        </div>
        {endAdornment}
      </div>
    </React.Fragment>
  );
}

export default withStyles(styles)(InputComponent);
