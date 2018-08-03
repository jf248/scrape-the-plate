import { compose, isRequired } from 'lib/form';

import { toTitleCase } from 'utils';

const normalize = values => {
  return {
    ...values,
    name: toTitleCase(values['title']),
  };
};
const validate = compose(isRequired(['title']));

export const editDialogProps = {
  normalize,
  validate,
};
