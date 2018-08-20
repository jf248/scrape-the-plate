import React from 'react';

import IngredientsField from './IngredientsField';
import { Section } from 'components/common';

function IngredientsSection(props) {
  const { inputProps, ...rest } = props;

  const caption = 'Tip: You can paste multiple ingredients at once.';

  return (
    <Section caption={caption} title={'Ingredients'} {...rest}>
      <IngredientsField {...inputProps} />
    </Section>
  );
}

export default IngredientsSection;
