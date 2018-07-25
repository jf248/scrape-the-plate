import React from 'react';

import { State, Compose } from 'lib/react-powerplug';

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

  const renderFunc = ({ setState, state }) => {
    return (
      <SourceSectionPres
        {...{
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
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[
        <State
          enableReinitialize
          initial={{ type: isScraped ? 'website' : 'user' }}
        />,
      ]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default SourceSection;
