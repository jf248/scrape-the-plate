import { compose, isRequired } from 'lib/form';

const normalize = values => {
  return {
    ...values,
  };
};
const validate = compose(isRequired(['name']));

export const editDialogProps = {
  normalize,
  validate,
};
