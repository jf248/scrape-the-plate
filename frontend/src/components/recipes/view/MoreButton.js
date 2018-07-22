import React from 'react';
import { IconButton, Menu, MenuItem, withStyles } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';

import DeleteDialog from './DeleteDialog';

const styles = () => ({
  root: {},
});

class MoreButtonPres extends React.Component {
  state = {
    anchorEl: null,
    isDialogOpen: false,
  };

  handleClickMenuButton = event => {
    const { isLoggedIn, openLoginModal } = this.props;
    if (!isLoggedIn) {
      openLoginModal();
    }
    return this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseMenu = () => {
    this.setState({ anchorEl: null });
  };

  handleCloseDialog = () => {
    this.setState({ isDialogOpen: false });
  };

  handleOpenDialog = () => {
    this.setState({ isDialogOpen: true });
  };

  render() {
    const { anchorEl } = this.state;
    const {
      classes,
      isLoggedIn,
      isOwner,
      onEdit,
      onDelete,
      onCopy,
    } = this.props;

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={anchorEl ? 'long-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClickMenuButton}
          className={classes.icon}
        >
          <MoreVert />
        </IconButton>
        {isLoggedIn && (
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleCloseMenu}
          >
            {isOwner && <MenuItem onClick={onEdit}>Edit</MenuItem>}
            {isOwner && (
              <MenuItem onClick={this.handleOpenDialog}>Delete</MenuItem>
            )}
            {!isOwner && <MenuItem onClick={onCopy}>Copy</MenuItem>}
          </Menu>
        )}
        <DeleteDialog
          onDelete={() => {
            onDelete();
            this.handleCloseDialog();
          }}
          open={this.state.isDialogOpen}
          onClose={this.handleCloseDialog}
        />
      </div>
    );
  }
}

MoreButtonPres.defaultProps = {};

export default withStyles(styles)(MoreButtonPres);
