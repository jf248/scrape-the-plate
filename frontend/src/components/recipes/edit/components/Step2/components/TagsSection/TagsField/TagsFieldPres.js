import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';

import { Field } from 'components/common';
import { TagsDialog } from 'components/tags';

const styles = () => ({
  root: {},
});

TagsFieldPres.defaultProps = {
  data: [],
  tagNames: [],
};

function TagsFieldPres(props) {
  const {
    className: classNameProp,
    classes,
    error,
    onBlur,
    onChange,
    onOpenDialog,
    tagNames,
    touched,
    value,
    ...rest
  } = props;

  const className = classNames(classes.root, classNameProp);

  // TODO changed to a chipinput
  return (
    <React.Fragment>
      <Field
        {...{
          label: 'Title',
          touched,
          error,
          className,
          onClick: onOpenDialog,
          onKeyDown: onOpenDialog,
          onBlur,
          value: tagNames.join(', '),
          ...rest,
        }}
      />
      <TagsDialog
        {...{
          onChange,
          value,
        }}
      />
    </React.Fragment>
  );
}

export default withStyles(styles)(TagsFieldPres);
