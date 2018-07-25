import React from 'react';
import { MenuItem, Select, withStyles } from '@material-ui/core';

import { TextField } from 'components/utils';
import Section from '../Section';
import BookTitleField from './BookTitleField';
import { FlexContainer, FlexGrow, FlexShrink } from 'components/utils';

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
    pageInputProps,
    sourceTypeInputProps,
    type,
    types,
    urlInputProps,
    ...rest
  } = props;

  return (
    <Section title={'Source'} {...rest}>
      <FlexContainer>
        {!isScraped && (
          <FlexShrink>
            <Select className={classes.marginRight} {...sourceTypeInputProps}>
              {types.map(type => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FlexShrink>
        )}
        {type === 'website' && (
          <FlexGrow>
            <TextField
              fullWidth
              disabled={isScraped}
              {...urlInputProps}
              label={'URL'}
            />
          </FlexGrow>
        )}
        {type === 'book' && (
          <React.Fragment>
            <FlexShrink>
              <BookTitleField
                className={classes.marginRight}
                bookInputProps={bookInputProps}
              />
            </FlexShrink>
            <FlexShrink>
              <TextField
                {...pageInputProps}
                type={'number'}
                step={1}
                label={'Page'}
              />
            </FlexShrink>
          </React.Fragment>
        )}
      </FlexContainer>
    </Section>
  );
}

export default withStyles(styles)(SourceSection);
