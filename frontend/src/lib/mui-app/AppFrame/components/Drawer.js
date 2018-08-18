import React from 'react';
import classNames from 'classnames';
import * as Mui from '@material-ui/core';

const styles = () => ({
  root: {},
});

function Drawer(props) {
  const {
    children,
    classes,
    className: classNameProp,
    onToggle,
    open,
    ...rest
  } = props;

  const className = classNames(classes.root, classNameProp);

  return (
    <Mui.Drawer open={open} onClose={onToggle} className={className} {...rest}>
      <div tabIndex={0} role="button" onClick={onToggle} onKeyDown={onToggle}>
        {children}
      </div>
    </Mui.Drawer>
  );
}

export default Mui.withStyles(styles)(Drawer);
