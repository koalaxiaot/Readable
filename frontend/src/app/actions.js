export const CHANGE_USERNAME = 'CHANGE_USERNAME';
export const IS_FETCHING = 'IS_FETCHING';

export const changeUsername = (username) => ({
  type: CHANGE_USERNAME,
  username
});

export const toggleFetching = (is_fetching) => ({
  type: IS_FETCHING,
  is_fetching
});