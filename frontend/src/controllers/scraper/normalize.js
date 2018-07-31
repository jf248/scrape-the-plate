import { toTitleCase } from 'utils';

export default values => ({
  ...values,
  title: toTitleCase(values.title),
});
