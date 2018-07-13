import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';

import { TextField } from 'components/utils';
import BookTitleDialog from '../BookTitleDialog';

const styles = () => ({
  root: {},
});

BookTitleFieldPres.defaultProps = {
  data: [],
};

function BookTitleFieldPres(props) {
  const {
    classes,
    className: classNameProp,
    value,
    error,
    ids,
    data,
    onChange,
    touched,
    isModalOpen,
    onCloseModal,
    onOpenModal,
    onBlur,
    title,
    ...rest
  } = props;

  const className = classNames(classes.root, classNameProp);

  return (
    <React.Fragment>
      <TextField
        {...{
          label: 'Title',
          touched,
          error,
          className,
          onClick: onOpenModal,
          onBlur,
          value: title,
          ...rest,
        }}
      />
      <BookTitleDialog {...{
        onChange,
        open: isModalOpen,
        onClose: onCloseModal,
        ids,
        data,
        value,
      }}/>
    </React.Fragment>
  );
}

export default withStyles(styles)(BookTitleFieldPres);

/*
*/
