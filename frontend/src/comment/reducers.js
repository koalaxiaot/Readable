import { combineReducers } from 'redux';
import { SORT_COMMENT, CHANGE_SORT_KEY, CHANGE_SORT_ORDER, RECEIVE_COMMENTS, VOTE_COMMENT, IS_SHOW_COMMENT_DIALOG, ADD_COMMENT, UPDATE_COMMENT, CHANGE_CURRENT_COMMENT, DELETE_COMMENT } from './actions';

const comments = (state = [], action) => {

  const { comments, option, id } = action;

  switch (action.type) {
    case RECEIVE_COMMENTS:
      return comments
    case VOTE_COMMENT:
      if (option === 'upVote') {
        return state.map(comment => comment.id === id ? { ...comment, voteScore: comment.voteScore + 1 } : comment)
      }
      if (option === 'downVote') {
        return state.map(comment => comment.id === id ? { ...comment, voteScore: comment.voteScore - 1 } : comment)
      }
      return state;
    case SORT_COMMENT:
      const { key, order } = action;
      return [...state.sort((a, b) => (
        order === 'desc'
          ? a[key] < b[key] ? 1 : -1
          : a[key] > b[key] ? 1 : -1
      ))];
    case ADD_COMMENT:
      const { comment } = action;
      return [...state, comment];
    case UPDATE_COMMENT:
      const { body } = action;
      return state.map(comment => comment.id === id ? { ...comment, body } : comment);
    case DELETE_COMMENT:
      return state.filter(comment => comment.id !== id);
    default:
      return state;
  }
};

const sortKey = (state = 'timestamp', action) => {
  switch (action.type) {
    case CHANGE_SORT_KEY:
      return action.key
    default:
      return state;
  }
};

const sortOrder = (state = 'asc', action) => {
  switch (action.type) {
    case CHANGE_SORT_ORDER:
      return action.order
    default:
      return state;
  }
};

const isShowCommentDialog = (state = false, action) => {
  switch (action.type) {
    case IS_SHOW_COMMENT_DIALOG:
      return action.isShow ? true : false
    default:
      return state;
  }
}

const currentComment = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_CURRENT_COMMENT:
      return action.comment
    default:
      return state;
  }
};

export default combineReducers({
  comments,
  sortKey,
  sortOrder,
  isShowCommentDialog,
  currentComment
});