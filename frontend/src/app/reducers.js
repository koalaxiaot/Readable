import { CHANGE_USERNAME } from './actions';

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

export default username;