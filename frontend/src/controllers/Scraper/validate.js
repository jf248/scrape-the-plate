import { compose, validateField, isUrl } from 'lib/form/validators';

const isInSources = sources => value => {
  if (!value) {
    return true;
  }
  const re = /^(?:(?:https?):\/\/)?(?:www.)?([^:/\s#?]+)\/(?:[^:\s]+)$/;
  const match = value.match(re);
  if (!match) {
    return true;
  }
  const domain_name = match[1];
  const findSource = sources =>
    Object.keys(sources).find(id => sources[id].domain_name === domain_name);
  if (sources && !findSource(sources)) {
    return false;
  }
  return true;
};

export default sources =>
  compose(
    isUrl('url'),
    validateField(
      'url',
      isInSources(sources),
      "Sorry, can't scrape from there yet."
    )
  );
