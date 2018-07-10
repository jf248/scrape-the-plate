import React from 'react';
import classNames from 'classnames';
import { FormControlLabel, Switch, withStyles } from '@material-ui/core';

const styles = () => ({
  root: {},
});

ToggleField.defaultProps = {
  component: Switch,
};

function ToggleField(props) {
  const {
    component: Component,
    classes,
    className: classNameProp,
    value,
    name,
    onChange,
    color,
    ...rest
  } = props;

  const className = classNames(classes.root, classNameProp);

  return (
    <FormControlLabel
      className={className}
      control={
        <Component
          checked={value}
          value={name}
          onChange={(event, checked) => onChange(checked)}
          color={color}
        />
      }
      {...rest}
    />
  );
}

export default withStyles(styles)(ToggleField);
