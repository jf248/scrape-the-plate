import React from 'react';
import { MenuItem, Select, withStyles } from '@material-ui/core';

import {
  Field,
  FlexContainer,
  FlexGrow,
  FlexShrink,
  Section,
} from 'components/common';
import BookTitleField from './BookTitleField';

const styles = theme => ({
  marginRight: {
    marginRight: theme.spacing.unit * 2,
  },
});

SourceSection.defaultProps = {
  sourceTypeInputProps: {},
};

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
            <Select
              className={classes.marginRight}
              {...{ ...sourceTypeInputProps, touched: undefined }}
            >
              {types.map(type => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FlexShrink>
        )}
        {(type === 'website' || isScraped) && (
          <FlexGrow>
            <Field
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
              <Field
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
