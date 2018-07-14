import React from 'react';

import { State, Compose } from 'lib/react-powerplug';

import SourceSectionPres from './SourceSectionPres';

function SourceSection(props) {
  const {
    sourceInputProps,
    urlInputProps,
    bookInputProps,
    pageInputProps,
    ...rest
  } = props;

  const types = [
    { label: 'My own', value: 'user' },
    { label: 'Book', value: 'book' },
    { label: 'Website', value: 'website' },
  ];

  const isScraped = !!sourceInputProps && !!sourceInputProps.value;

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
          ...rest,
        }}
      />
    );
  };

  // TODO: initial type should be based on initialValues, i.e. if scraped -> url
  // and disabled
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
