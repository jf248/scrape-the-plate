import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';

import { Field } from 'components/common';
import { BookDialog } from 'components/books';

const styles = () => ({
  root: {},
});

Component.defaultProps = {
  data: [],
};

function Component(props) {
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
      <Field
        {...{
          label: 'Title',
          touched,
          error,
          className,
          onClick: onOpenModal,
          onKeyDown: onOpenModal,
          onBlur,
          value: title,
          ...rest,
        }}
      />
      <BookDialog
        {...{
          onChange,
          open: isModalOpen,
          onClose: onCloseModal,
          ids,
          data,
          value,
        }}
      />
    </React.Fragment>
  );
}

const BookTitleFieldPres = withStyles(styles)(Component);

export default BookTitleFieldPres;
