import React from 'react';

import { State, Compose } from 'lib/react-powerplug';

import SourceSectionPres from './SourceSectionPres';

function SourceSection(props) {
  const {
    sourceInputProps,
    urlInputProps,
    bookInputProps,
    pageInputProps,
  } = props;

  const types = [
    { label: 'My own', value: 'user' },
    { label: 'Book', value: 'book' },
    { label: 'Website', value: 'website' },
  ];

  const renderFunc = ({ setState, state }) => {
    const onChangeType = type => setState({ type });
    const type = state.type;
    return (
      <SourceSectionPres
        {...{
          type,
          types,
          isScraped,
          onChangeType,
          urlInputProps,
          bookInputProps,
          pageInputProps,
        }}
      />
    );
  };

  const isScraped = !!sourceInputProps && !!sourceInputProps.value;

  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[<State initial={{ type: 'user' }} />]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default SourceSection;
