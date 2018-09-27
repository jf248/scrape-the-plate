import React from 'react';
import * as Mui from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import HelpOutline from '@material-ui/icons/HelpOutline';
import Group from '@material-ui/icons/Group';

import * as Tags from 'components/tags';
import * as Common from 'components/common';
import { PlateIcon } from 'components/icons';
import * as C from './components';

const styles = () => ({
  root: {},
});

DrawerContentPres.defaultProps = {
  tagIds: [],
};

function DrawerContentPres(props) {
  const { onAddTag, getModalProps } = props;

  return (
    <React.Fragment>
      <Mui.List>
        <Mui.ListItem>
          <C.Button to={'/recipes/create'} variant="extendedFab">
            <Mui.Icon>
              <Add />
            </Mui.Icon>
            {'Add a recipe'}
          </C.Button>
        </Mui.ListItem>
      </Mui.List>
      <Mui.List subheader={<Mui.ListSubheader>{'Recipes'}</Mui.ListSubheader>}>
        <C.ListItem to={'/recipes/mine'} dense button>
          <Mui.ListItemIcon>
            <PlateIcon />
          </Mui.ListItemIcon>
          <Mui.ListItemText primary={'My recipes'} />
        </C.ListItem>
        <C.ListItem to={'/recipes'} dense button>
          <Mui.ListItemIcon>
            <Group />
          </Mui.ListItemIcon>
          <Mui.ListItemText primary={'All recipes'} />
        </C.ListItem>
      </Mui.List>
      <Mui.Divider />
      <Mui.List subheader={<Mui.ListSubheader>{'Tags'}</Mui.ListSubheader>}>
        <C.TagList />
        <Mui.ListItem dense button onClick={onAddTag}>
          <Mui.ListItemIcon>
            <Add />
          </Mui.ListItemIcon>
          <Mui.ListItemText primary={'Create new...'} />
        </Mui.ListItem>
      </Mui.List>
      <Mui.Divider />
      <Mui.List>
        <C.ListItem to={'/about'} button dense>
          <Mui.ListItemIcon>
            <HelpOutline />
          </Mui.ListItemIcon>
          <Mui.ListItemText primary={'About'} />
        </C.ListItem>
      </Mui.List>
      <Common.EditResourceDialog {...getModalProps(Tags.editDialogProps)} />
    </React.Fragment>
  );
}

export default Mui.withStyles(styles)(DrawerContentPres);
