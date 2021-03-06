import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';

import * as Common from 'components/common';
import * as Tags from 'components/tags';

const styles = () => ({
  root: {},
});

TagsFieldPres.defaultProps = {
  tagNames: [],
};

function TagsFieldPres({
  className: classNameProp,
  classes,
  error,
  onBlur,
  onChange,
  onOpenModal,
  tagNames,
  touched,
  selectedItems,
  getModalProps,
  ...rest
}) {
  const className = classNames(classes.root, classNameProp);

  return (
    <React.Fragment>
      <Common.Field
        {...{
          className,
          component: Common.ChipField,
          error,
          fullWidth: true,
          label: 'Tags',
          onBlur,
          onClick: onOpenModal,
          onKeyDown: onOpenModal,
          touched,
          value: tagNames,
          ...rest,
        }}
      />
      <Common.SelectResourceDialog
        {...getModalProps({
          editDialogProps: Tags.editDialogProps,
          multiple: true,
          onChange,
          resource: 'tags',
          stringField: 'name',
          selectedItems,
        })}
      />
    </React.Fragment>
  );
}

export default withStyles(styles)(TagsFieldPres);
