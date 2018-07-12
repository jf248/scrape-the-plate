import React from 'react';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    position: 'relative',
  },
  typeAhead: {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: theme.palette.type === 'light' ? 0.42 : 0.5,
  },
});

InputWithTypeahead.defaultProps = {};

function InputWithTypeahead(props) {
  const {
    classes,
    className,
    inputRef,
    rootProps: { className: rootClassName, ...rootPropsProp } = {},
    typeAheadProps: {
      className: typeAheadClassName,
      ...typeAheadPropsProp
    } = {},
    typeAheadText,
    ...rest
  } = props;

  return (
    <div className={classnames(classes.root, rootClassName)} {...rootPropsProp}>
      {typeAheadText && (
        <div
          className={classnames(
            className,
            classes.typeAhead,
            typeAheadClassName
          )}
          {...typeAheadPropsProp}
        >
          {typeAheadText}
        </div>
      )}
      <input ref={inputRef} className={className} {...rest} />
    </div>
  );
}

export default withStyles(styles)(InputWithTypeahead);
