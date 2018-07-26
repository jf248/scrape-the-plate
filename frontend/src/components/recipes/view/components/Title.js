import React from 'react';
import classNames from 'classnames';
import { Typography, withStyles } from '@material-ui/core';

const styles = () => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  title: {
    flex: '1 1 0',
  },
  moreButton: {
    flex: '0 0 auto',
  },
});

Title.defaultProps = {
  title: 'A Recipe',
};

function Title(props) {
  const {
    classes,
    className: classNameProp,
    title,
    moreButton,
    ...rest
  } = props;

  const className = classNames(classes.root, classNameProp);

  return (
    <div className={className} {...rest}>
      <Typography className={classes.title} variant={'display1'} paragraph>
        {title}
      </Typography>
      {React.cloneElement(moreButton, {
        className: classNames(moreButton.props.className, classes.moreButton),
      })}
    </div>
  );
}

export default withStyles(styles)(Title);
