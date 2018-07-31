import React from 'react';
import classnames from 'classnames';
import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  withStyles,
  Menu,
  MenuItem as SubMenuItem,
} from '@material-ui/core';
import { MoreVert as MoreVertIcon } from '@material-ui/icons';

const styles = theme => ({
  highlighted: {
    backgroundColor: theme.palette.action.hover,
  },
  selected: {
    backgroundColor: theme.palette.action.selected,
  },
});

class MenuItem extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = cb => {
    this.setState({ anchorEl: null }, cb);
  };

  handleAction = (item, cb) => () => {
    this.handleClose(() => {
      cb && cb(item);
    });
  };

  render() {
    const { anchorEl } = this.state;
    const {
      classes,
      className: classNameProp,
      downshiftProps,
      index,
      item,
      selectedItems,
      onEdit,
      onDelete,
      ...rest
    } = this.props;

    const { getItemProps, highlightedIndex, itemToString } = downshiftProps;

    const className = classnames(
      { [classes.highlighted]: highlightedIndex === index },
      { [classes.selected]: selectedItems.includes(item) },
      classNameProp
    );

    return (
      <React.Fragment>
        <ListItem
          {...getItemProps({
            className,
            index,
            item,
            button: true,
            ...rest,
          })}
        >
          <ListItemText>{itemToString(item)}</ListItemText>
          <ListItemSecondaryAction onClick={this.handleClick}>
            <IconButton aria-label="Comments">
              <MoreVertIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <SubMenuItem onClick={this.handleAction(item, onEdit)}>
            Edit
          </SubMenuItem>
          <SubMenuItem onClick={this.handleAction(item, onDelete)}>
            Delete
          </SubMenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

MenuItem.defaultProps = {
  selectedItems: [],
};

export default withStyles(styles)(MenuItem);
