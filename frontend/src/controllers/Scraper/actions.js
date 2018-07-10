export const SKIP = 'APP/SCRAPER/SKIP';
export const GO_BACK = 'APP/SCRAPER/GO_BACK';
export const FAILURE = 'APP/SCRAPER/FAILURE';
export const SUCCESS = 'APP/SCRAPER/SUCCESS';

export const skip = () => ({
  type: SKIP,
});

export const goBack = () => ({
  type: GO_BACK,
});

export const failure = (error, meta) => ({
  type: FAILURE,
  error,
  meta,
});

export const success = (payload, meta) => ({
  type: SUCCESS,
  payload,
  meta,
});
