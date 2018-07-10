import React from 'react';
import classNames from 'classnames';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  withStyles,
} from '@material-ui/core';

import { callAll } from 'lib/react-powerplug';

const styles = () => ({
  root: {},
});

SitesDialog.defaultProps = {
  sources: {},
};

function SitesDialog(props) {
  const {
    open,
    onClose,
    classes,
    className: classNameProp,
    sources,
    onSelectDomain,
  } = props;

  const className = classNames(classes.root, classNameProp);
  const { data = {}, ids = [] } = sources;

  return (
    <Dialog open={open} onClose={onClose} className={className}>
      <DialogTitle>You can scrape recipes from these sites</DialogTitle>
      <DialogContent>
        <List>
          {ids.map(id => {
            const { name, domain_name } = data[id];
            return domain_name ? (
              <ListItem
                key={name}
                button
                onClick={callAll(onSelectDomain(domain_name), onClose)}
              >
                <ListItemText primary={name} />
              </ListItem>
            ) : null;
          })}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color={'primary'}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withStyles(styles)(SitesDialog);
