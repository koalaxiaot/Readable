import * as API from '../utils/api';
import { toggleFetching } from '../app/actions';

export const RECEIVE_CATEGORY = 'RECEIVE_CATEGORY';

export const receiveCategory = (categories) => ({
  type: RECEIVE_CATEGORY,
  categories
});

export const fetchCategory = () => (dispatch) => {
  dispatch(toggleFetching(true));
  API.getCategories().then(c => {
    dispatch(receiveCategory(c));
    setTimeout(
      dispatch(toggleFetching(false)),
      10000);
  });
};