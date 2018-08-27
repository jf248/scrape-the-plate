import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';

import TagsField from './TagsField';
import { Section } from 'components/common';

const styles = () => ({
  root: {},
});

TagsSectionPres.defaultProps = {};

function TagsSectionPres(props) {
  const { classes, className: classNameProp, inputProps, ...rest } = props;

  const className = classNames(classes.root, classNameProp);
  const isError = !!inputProps.error;

  return (
    <Section title={'Tags'} className={className} error={isError} {...rest}>
      <TagsField inputProps={inputProps} />
    </Section>
  );
}

export default withStyles(styles)(TagsSectionPres);
