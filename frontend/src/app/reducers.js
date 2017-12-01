import { combineReducers } from 'redux';
import { CHANGE_USERNAME, toggleFetching, IS_FETCHING } from './actions';

// store username into localStorage
const username = (state = localStorage.username || 'koala', action) => {
  const { username } = action;
  switch (action.type) {
    case CHANGE_USERNAME:
      localStorage.username = username;
      return username
    default:
      return state;
  }
};

const is_fetching = (state = false, action) => {
  switch (action.type) {
    case IS_FETCHING:
      return action.is_fetching
    default:
      return state;
  }
};

export { username, is_fetching };