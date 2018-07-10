import React from 'react';
import classNames from 'classnames';
import { withStyles, TextField } from '@material-ui/core';

import { noop } from 'utils';

const styles = () => ({
  root: {},
});

Filter.defaultProps = {
  component: 'div',
  filter: {},
  onChange: noop,
};

function Filter(props) {
  const {
    classes,
    className: classNameProp,
    component: Component,
    filter,
    onChange,
    ...rest
  } = props;

  const className = classNames(classes.root, classNameProp);

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      onChange({ ...filter, search: event.target.value });
    }
  };

  return (
    <Component className={className} {...rest}>
      <TextField
        placeholder={'Search'}
        inputProps={{
          onKeyPress: handleKeyPress,
        }}
      />
    </Component>
  );
}

export default withStyles(styles)(Filter);