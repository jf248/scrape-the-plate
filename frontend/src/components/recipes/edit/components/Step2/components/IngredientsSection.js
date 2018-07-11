import React from 'react';

import IngredientsField from './IngredientsField';
import Section from './Section';

function IngredientsSection(props) {
  const { inputProps } = props;

  const caption = 'Add ingredients one by one, or paste them all at once.';

  return (
    <Section caption={caption} title={'Ingredients'}>
      <IngredientsField {...inputProps} />
    </Section>
  );
}

export default IngredientsSection;
