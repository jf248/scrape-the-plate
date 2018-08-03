import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';

import * as Common from 'components/common';
import * as Books from 'components/books';

const styles = () => ({
  root: {},
});

BookFieldPres.defaultProps = {
  data: [],
};

function BookFieldPres(props) {
  const {
    className: classNameProp,
    classes,
    error,
    getModalProps,
    onBlur,
    onChange,
    onOpenModal,
    title,
    touched,
    value,
    ...rest
  } = props;

  const className = classNames(classes.root, classNameProp);

  return (
    <React.Fragment>
      <Common.Field
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
      <Common.ResourceDialog
        {...getModalProps({
          editDialogContentComponent: Books.EditContent,
          editDialogProps: Books.editDialogProps,
          multiple: false,
          onChange,
          resource: 'books',
          stringField: 'title',
          value,
        })}
      />
    </React.Fragment>
  );
}

export default withStyles(styles)(BookFieldPres);
