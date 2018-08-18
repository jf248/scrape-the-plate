import React from 'react';
import * as Mui from '@material-ui/core';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { HelpOutline, Add } from '@material-ui/icons';

import { PlateIcon } from 'components/icons';

const styles = () => ({
  root: {},
});

DrawerContent.defaultProps = {
  config: [],
  component: 'nav',
};

function DrawerContent(props) {
  const {
    classes,
    className: classNameProp,
    component,
    config,
    ...rest
  } = props;

  const renderLink = to => props => <Link to={to} {...props} />;

  const className = classNames(classes.root, classNameProp);

  return (
    <Mui.List component={component} className={className} {...rest}>
      <Mui.ListItem>
        <Mui.Button
          variant="extendedFab"
          component={renderLink('/recipes/create')}
        >
          <Mui.Icon>
            <Add />
          </Mui.Icon>
          {'Add a recipe'}
        </Mui.Button>
      </Mui.ListItem>
      <Mui.ListItem button component={renderLink('/recipes')}>
        <Mui.ListItemIcon>
          <PlateIcon />
        </Mui.ListItemIcon>
        <Mui.ListItemText primary={'Recipes'} />
      </Mui.ListItem>
      <Mui.ListItem button component={renderLink('/about')}>
        <Mui.ListItemIcon>
          <HelpOutline />
        </Mui.ListItemIcon>
        <Mui.ListItemText primary={'About'} />
      </Mui.ListItem>
    </Mui.List>
  );
}

export default Mui.withStyles(styles)(DrawerContent);
