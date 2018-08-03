import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles,
} from '@material-ui/core';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const styles = () => ({
  root: {},
});

DrawerList.defaultProps = {
  drawerConfig: [],
  component: 'nav',
};

function DrawerList(props) {
  const {
    classes,
    className: classNameProp,
    component,
    drawerConfig,
    ...rest
  } = props;

  const renderLink = to => props => <Link to={to} {...props} />;

  const renderItems = drawerConfig =>
    drawerConfig &&
    drawerConfig.map(({ path, Icon, text }, index) => (
      <ListItem key={index} button component={renderLink(path)}>
        {Icon && (
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
        )}
        <ListItemText inset={!Icon} primary={text} />
      </ListItem>
    ));

  const className = classNames(classes.root, classNameProp);

  return (
    <List component={component} className={className} {...rest}>
      {renderItems(drawerConfig)}
    </List>
  );
}

export default withStyles(styles)(DrawerList);
