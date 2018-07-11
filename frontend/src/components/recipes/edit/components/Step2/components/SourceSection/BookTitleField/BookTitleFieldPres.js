import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';

import { TextField } from 'components/utils';

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
    id,
    error,
    data,
    touched,
    onOpenModal,
    onBlur,
    ...rest
  } = props;

  const className = classNames(classes.root, classNameProp);

  const value = data[id] && data[id].name ? data[id].name : '';
  return (
    <React.Fragment>
      <TextField
        {...{
          touched,
          error,
          className,
          onClick: onOpenModal,
          onBlur,
          value,
          ...rest,
        }}
      />
    </React.Fragment>
  );
}

export default withStyles(styles)(BookTitleFieldPres);

/*
      <BookTitleDialog {...{
        onChangeId,
        open: isModalOpen,
        onClose: onCloseModal,
        ids,
        data,
        id,
      }}/>
*/
