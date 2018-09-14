import { compose, isRequired } from 'lib/form';

import EditContent from './EditContent';

const normalize = values => {
  return {
    ...values,
  };
};
const validate = compose(isRequired(['name']));

export const editDialogProps = {
  resource: 'groceryItems',
  resourceName: 'grocery item',
  component: EditContent,
  normalize,
  validate,
};
