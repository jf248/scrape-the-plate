import React from 'react';

import PreparationField from './PreparationField';
import Section from './Section';

function PreparationSection(props) {
  const { inputProps } = props;

  const caption =
    'Add the preparation steps one by one, or paste them all at once.';

  return (
    <Section caption={caption} title={'Preparation steps'}>
      <PreparationField {...inputProps} />
    </Section>
  );
}

export default PreparationSection;
