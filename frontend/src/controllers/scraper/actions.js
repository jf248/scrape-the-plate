export const SKIP = 'APP/SCRAPER/SKIP';
export const GO_BACK = 'APP/SCRAPER/GO_BACK';
export const COPY = 'APP/SCRAPER/COPY';

export const copy = (recipeData = {}) => {
  const { id, ingredients, slug, book, page, ...rest } = recipeData; // eslint-disable-line no-unused-vars

  const newIngredients = ingredients.map(ingredient => {
    const { id, ...rest } = ingredient; // eslint-disable-line no-unused-vars
    return rest;
  });
  const payload = { ...rest, ingredients: newIngredients };
  return {
    type: COPY,
    payload,
  };
};

export const skip = () => ({
  type: SKIP,
});

export const goBack = () => ({
  type: GO_BACK,
});
