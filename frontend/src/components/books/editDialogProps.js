import { compose, isRequired } from 'lib/form';

import { toTitleCase } from 'utils';
import EditContent from './EditContent';

const normalize = values => {
  return {
    ...values,
    name: toTitleCase(values['title']),
  };
};
const validate = compose(isRequired(['title']));

export const editDialogProps = {
  resource: 'books',
  resourceName: 'book',
  component: EditContent,
  normalize,
  validate,
};
