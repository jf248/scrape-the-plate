import { compose, isRequired } from 'lib/form';

import { toTitleCase } from 'utils';

const normalize = values => {
  return {
    ...values,
    name: toTitleCase(values['name']),
  };
};
const validate = compose(isRequired(['name']));

export const editDialogProps = {
  normalize,
  validate,
};
