import { compose, isRequired, isUrl } from 'lib/form/validators';

const custom = (values = {}, errors = {}) => {
  values['sourceType'] === 'book' &&
    !values['book'] &&
    (errors['book'] = 'Required.');

  values['sourceType'] === 'website' &&
    !values['url'] &&
    (errors['url'] = 'Required.');

  return errors;
};

export default compose(
  isRequired(['title']),
  isUrl('url'),
  custom
);
