import { compose, isRequired } from 'lib/form/validators';

export default compose(isRequired(['title']));
