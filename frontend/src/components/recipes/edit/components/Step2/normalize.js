import { toTitleCase } from 'utils';

export default values => {
  return {
    public: true,
    ...values,
    title: toTitleCase(values['title']),
  };
};
