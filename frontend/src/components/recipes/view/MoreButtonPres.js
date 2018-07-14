import React from 'react';
import { IconButton, Menu, MenuItem, withStyles } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';

const styles = () => ({
  root: {
  },
});

class MoreButtonPres extends React.Component {

  state = {
    anchorEl: null,
  };

  handleClick = event => {
      return this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const {
      classes,
      isOwner,
      onEdit,
      onDelete,
    } = this.props;

    if (!isOwner) {
      return null;
    }
    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={anchorEl ? 'long-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          className={classes.icon}
        >
          <MoreVert />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={onEdit}>Edit</MenuItem>
          <MenuItem onClick={onDelete}>Delete</MenuItem>
        </Menu>
      </div>
    );
  }
}

MoreButtonPres.defaultProps = {
};

export default withStyles(styles)(MoreButtonPres);
