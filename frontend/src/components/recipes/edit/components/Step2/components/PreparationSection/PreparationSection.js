import React from 'react';

import PreparationField from './PreparationField';
import { Section } from 'components/common';

function PreparationSection(props) {
  const { inputProps, ...rest } = props;

  const caption = 'Tip: You can paste multiple steps at once.';
  const isError = !!inputProps.error;

  return (
    <Section
      caption={caption}
      title={'Preparation steps'}
      error={isError}
      {...rest}
    >
      <PreparationField {...inputProps} />
    </Section>
  );
}

export default PreparationSection;
