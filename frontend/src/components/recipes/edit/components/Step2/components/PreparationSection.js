import React from 'react';

import PreparationField from './PreparationField';
import { Section } from 'components/common';

function PreparationSection(props) {
  const { inputProps, ...rest } = props;

  const caption =
    'Add the preparation steps one by one, or paste them all at once.';

  return (
    <Section caption={caption} title={'Preparation steps'} {...rest}>
      <PreparationField {...inputProps} />
    </Section>
  );
}

export default PreparationSection;
