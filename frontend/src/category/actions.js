import * as API from '../utils/api';

export const RECEIVE_CATEGORY = 'RECEIVE_CATEGORY';

export const receiveCategory = (categories) => ({
  type: RECEIVE_CATEGORY,
  categories
});

export const fetchCategory = () => (dispatch) =>
  API.getCategories().then(categories =>
    dispatch(receiveCategory(categories))
  );