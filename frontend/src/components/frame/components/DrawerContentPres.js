import React from 'react';
import * as Mui from '@material-ui/core';
import { Link } from 'react-router-dom';
import * as MuiIcons from '@material-ui/icons';

import { PlateIcon } from 'components/icons';

const styles = () => ({
  root: {},
});

DrawerContentPres.defaultProps = {
  tags: [],
};

function DrawerContentPres(props) {
  const { path, url, tags, onClickAddTag, createTag } = props;

  const renderLink = to => props => <Link to={to} {...props} />;

  const tagListItems = tags.map(tag => (
    <Mui.ListItem
      key={tag.id}
      selected={url === `/tags/${tag.id}`}
      button
      dense
      component={renderLink(`/tags/${tag.id}`)}
    >
      <Mui.ListItemIcon>
        <MuiIcons.Label />
      </Mui.ListItemIcon>
      <Mui.ListItemText primary={tag.name} />
    </Mui.ListItem>
  ));

  return (
    <React.Fragment>
      <Mui.List>
        <Mui.ListItem>
          <Mui.Button
            variant="extendedFab"
            component={renderLink('/recipes/create')}
          >
            <Mui.Icon>
              <MuiIcons.Add />
            </Mui.Icon>
            {'Add a recipe'}
          </Mui.Button>
        </Mui.ListItem>
      </Mui.List>
      <Mui.List subheader={<Mui.ListSubheader>{'Recipes'}</Mui.ListSubheader>}>
        <Mui.ListItem
          selected={path === '/recipes/mine'}
          dense
          button
          component={renderLink('/recipes/mine')}
        >
          <Mui.ListItemIcon>
            <PlateIcon />
          </Mui.ListItemIcon>
          <Mui.ListItemText primary={'My recipes'} />
        </Mui.ListItem>
        <Mui.ListItem
          selected={path === '/recipes'}
          dense
          button
          component={renderLink('/recipes')}
        >
          <Mui.ListItemIcon>
            <MuiIcons.Group />
          </Mui.ListItemIcon>
          <Mui.ListItemText primary={'All recipes'} />
        </Mui.ListItem>
      </Mui.List>
      <Mui.Divider />
      <Mui.List subheader={<Mui.ListSubheader>{'Tags'}</Mui.ListSubheader>}>
        {tagListItems}
        <Mui.ListItem dense button onClick={onClickAddTag}>
          <Mui.ListItemIcon>
            <MuiIcons.Add />
          </Mui.ListItemIcon>
          <Mui.ListItemText primary={'Create new...'} />
        </Mui.ListItem>
      </Mui.List>
      <Mui.Divider />
      <Mui.List>
        <Mui.ListItem
          selected={path === '/about'}
          button
          dense
          component={renderLink('/about')}
        >
          <Mui.ListItemIcon>
            <MuiIcons.HelpOutline />
          </Mui.ListItemIcon>
          <Mui.ListItemText primary={'About'} />
        </Mui.ListItem>
      </Mui.List>
      {createTag}
    </React.Fragment>
  );
}

export default Mui.withStyles(styles)(DrawerContentPres);
