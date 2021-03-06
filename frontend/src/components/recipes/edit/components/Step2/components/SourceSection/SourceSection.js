import React from 'react';

import SourceSectionPres from './SourceSectionPres';

SourceSection.defaultProps = {
  sourceInputProps: {},
  sourceTypeInputProps: {},
};
function SourceSection(props) {
  const {
    bookInputProps,
    pageInputProps,
    sourceInputProps,
    sourceTypeInputProps,
    urlInputProps,
    ...rest
  } = props;

  const types = [
    { label: 'My own', value: 'user' },
    { label: 'Book', value: 'book' },
    { label: 'Website', value: 'website' },
  ];

  const isScraped = !!sourceInputProps.value;
  const type = sourceTypeInputProps.value;
  const error =
    !!bookInputProps.error ||
    !!pageInputProps.error ||
    !!sourceInputProps.error ||
    !!sourceTypeInputProps.error ||
    !!urlInputProps.error;

  return (
    <SourceSectionPres
      {...{
        error,
        type,
        types,
        isScraped,
        urlInputProps,
        bookInputProps,
        pageInputProps,
        sourceTypeInputProps,
        ...rest,
      }}
    />
  );
}

export default SourceSection;
