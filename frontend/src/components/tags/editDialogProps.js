import { compose, isRequired } from 'lib/form';

import { toTitleCase } from 'utils';
import EditContent from './EditContent';

const normalize = values => {
  return {
    ...values,
    name: toTitleCase(values['name']),
  };
};
const validate = compose(isRequired(['name']));

export const editDialogProps = {
  resource: 'tags',
  resourceName: 'tag',
  component: EditContent,
  normalize,
  validate,
};
