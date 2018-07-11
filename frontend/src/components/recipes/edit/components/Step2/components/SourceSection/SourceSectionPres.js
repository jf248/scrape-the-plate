import React from 'react';
import { MenuItem, Select, withStyles } from '@material-ui/core';

import { TextField } from 'components/utils';
import Section from '../Section';
import BookTitleField from './BookTitleField';

const styles = theme => ({
  marginRight: {
    marginRight: theme.spacing.unit * 2,
  },
});

function SourceSection(props) {
  const {
    bookInputProps,
    classes,
    isScraped,
    onChangeType,
    pageInputProps,
    type,
    types,
    urlInputProps,
  } = props;

  return (
    <Section title={'Source'}>
      {!isScraped && (
        <Select
          className={classes.marginRight}
          value={type}
          onChange={event => {
            onChangeType(event.target.value);
          }}
        >
          {types.map(type => (
            <MenuItem key={type.value} value={type.value}>
              {type.label}
            </MenuItem>
          ))}
        </Select>
      )}
      {(isScraped || type === 'website') && (
        <TextField disabled={isScraped} {...urlInputProps} label={'URL'} />
      )}
      {type === 'book' && (
        <React.Fragment>
          <BookTitleField
            className={classes.marginRight}
            bookInputProps={bookInputProps}
          />
          <TextField
            {...pageInputProps}
            type={'number'}
            step={1}
            label={'Page'}
          />
        </React.Fragment>
      )}
    </Section>
  );
}

export default withStyles(styles)(SourceSection);
