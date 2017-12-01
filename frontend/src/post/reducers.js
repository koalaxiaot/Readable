import { combineReducers } from 'redux';
import { CHANGE_CURRENT_POST, IS_SHOW_POST_DIALOG, ADD_POST, UPDATE_POST, VOTE_POST, DELETE_POST, RECEIVE_POSTS, SORT_POST, CHANGE_SORT_KEY, CHANGE_SORT_ORDER } from './actions';

const posts = (state = [], action) => {

  const { id, title, body, option } = action;

  switch (action.type) {

    case RECEIVE_POSTS:
      return [...action.posts]

    case ADD_POST:
      const { post } = action;
      return [post, ...state];

    case UPDATE_POST:
      return state.map(post => post.id === id ? { ...post, title, body } : post)

    case VOTE_POST:
      if (option === 'upVote') {
        return state.map(post => post.id === id ? { ...post, voteScore: post.voteScore + 1 } : post)
      }
      if (option === 'downVote') {
        return state.map(post => post.id === id ? { ...post, voteScore: post.voteScore - 1 } : post)
      }
      return state;

    case DELETE_POST:
      return state.filter(post => post.id !== id);

    case SORT_POST:
      const { key, order } = action;
      return [...state.sort((a, b) => (
        order === 'desc'
          ? a[key] < b[key] ? 1 : -1
          : a[key] > b[key] ? 1 : -1
      ))];

    default:
      return state;
  }

}

const sortKey = (state = 'timestamp', action) => {
  switch (action.type) {
    case CHANGE_SORT_KEY:
      return action.key
    default:
      return state;
  }
};

const sortOrder = (state = 'desc', action) => {
  switch (action.type) {
    case CHANGE_SORT_ORDER:
      return action.order
    default:
      return state;
  }
};

const isShowPostDialog = (state = false, action) => {
  switch (action.type) {
    case IS_SHOW_POST_DIALOG:
      return action.isShow ? true : false
    default:
      return state;
  }
};

const currentPost = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_CURRENT_POST:
      return action.post
    default:
      return state;
  }
};

export default combineReducers({
  posts,
  sortKey,
  sortOrder,
  isShowPostDialog,
  currentPost
});