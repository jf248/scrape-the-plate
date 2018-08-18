import { toTitleCase } from 'utils';

export default values => {
  let newValues = { ...values };

  // Add a sourceType if no source (i.e. not scraped) and no sourceType
  if (!newValues['source'] && !newValues['sourceType']) {
    newValues['sourceType'] = 'user';
  }

  switch (newValues['sourceType']) {
    case 'user':
      newValues = {
        ...newValues,
        url: undefined,
        page: undefined,
        book: undefined,
      };
      break;
    case 'website':
      newValues = { ...newValues, page: undefined, book: undefined };
      break;
    case 'book':
      newValues = { ...newValues, url: undefined };
      break;
    default:
      break;
  }

  if (Array.isArray(values['ingredients'])) {
    newValues = {
      ...newValues,
      ingredients: values['ingredients'].map(ingredient => ({
        ...ingredient,
        text: ingredient.text.trim(),
      })),
    };
  }

  return {
    public: true,
    ...newValues,
    title: toTitleCase(values['title']),
  };
};
