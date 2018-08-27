import React from 'react';

import IngredientsField from './IngredientsField';
import { Section } from 'components/common';

function IngredientsSection(props) {
  const { inputProps, ...rest } = props;

  const caption = 'Tip: You can paste multiple ingredients at once.';
  const isError = !!inputProps.error;

  return (
    <Section caption={caption} title={'Ingredients'} error={isError} {...rest}>
      <IngredientsField {...inputProps} />
    </Section>
  );
}

export default IngredientsSection;
