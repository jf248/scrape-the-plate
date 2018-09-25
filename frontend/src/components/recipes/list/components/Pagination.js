import React from 'react';
import classNames from 'classnames';
import { withStyles, Toolbar, Typography, IconButton } from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import { noop } from 'utils';

const styles = theme => ({
  root: {
    fontSize: theme.typography.pxToRem(12),
    // Increase the specificity to override TableCell.
    '&:last-child': {
      padding: 0,
    },
  },
  toolbar: {
    height: 56,
    minHeight: 56,
    paddingRight: 2,
  },
  caption: {
    flexShrink: 0,
  },
  actions: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

Pagination.defaultProps = {
  component: 'div',
  onChangePage: noop,
  page: 1,
  count: 0,
  countPerPage: 1,
};

function Pagination(props) {
  const {
    count: countProp,
    page,
    countPerPage,
    classes,
    className: classNameProp,
    component: Component,
    onChangePage,
    ...rest
  } = props;

  const count = !countProp ? 0 : countProp;

  const className = classNames(classes.root, classNameProp);
  const displayCount = ({ from, to, count }) => `${from}-${to} of ${count}`;
  const handleBackButtonClick = () => onChangePage(page - 1);
  const handleNextButtonClick = () => onChangePage(page + 1);

  return (
    <Component className={className} {...rest}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="caption" className={classes.caption}>
          {displayCount({
            from: !count ? 0 : (page - 1) * countPerPage + 1,
            to: Math.min(count, page * countPerPage),
            count,
            page,
          })}
        </Typography>
        <div className={classes.actions}>
          <IconButton onClick={handleBackButtonClick} disabled={page === 1}>
            <KeyboardArrowLeft />
          </IconButton>
          <IconButton
            onClick={handleNextButtonClick}
            disabled={!countPerPage || page >= Math.ceil(count / countPerPage)}
          >
            <KeyboardArrowRight />
          </IconButton>
        </div>
      </Toolbar>
    </Component>
  );
}

export default withStyles(styles)(Pagination);
