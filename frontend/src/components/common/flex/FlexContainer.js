import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';

const styles = () => ({
  root: {
    alignItems: 'baseline',
    display: 'flex',
    flexWrap: 'wrap',
  },
});

FlexContainer.defaultProps = {
  component: 'div',
};

function FlexContainer(props) {
  const {
    classes,
    className: classNameProp,
    component,
    children,
    ...rest
  } = props;

  const className = classNames(classes.root, classNameProp);

  const Component = component;

  return (
    <Component className={className} {...rest}>
      {children}
    </Component>
  );
}

export default withStyles(styles)(FlexContainer);
