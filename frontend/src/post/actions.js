import * as API from '../utils/api';

export const ADD_POST = 'ADD_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const VOTE_POST = 'VOTE_POST';
export const DELETE_POST = 'DELETE_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SORT_POST = 'SORT_POST';
export const CHANGE_SORT_KEY = 'CHANGE_SORT_KEY';
export const CHANGE_SORT_ORDER = 'CHANGE_SORT_ORDER';
export const IS_SHOW_POST_DIALOG = 'IS_SHOW_POST_DIALOG';
export const CHANGE_CURRENT_POST = 'CHANGE_CURRENT_POST';

export const receivePosts = (posts) => ({
  type: RECEIVE_POSTS,
  posts
});

export const fetchPosts = () => (dispatch, getState) => {
  API.getPosts().then(posts => {
    dispatch(receivePosts(posts));
    return dispatch(sortPost(getState().posts.sortKey, getState().posts.sortOrder));
  });
}

export const fetchCatPosts = (cat) => (dispatch, getState) => {
  API.getCPosts(cat).then(posts => {
    dispatch(receivePosts(posts));
    return dispatch(sortPost(getState().posts.sortKey, getState().posts.sortOrder));
  });
}

export const fetchOnePost = (id) => (dispatch) => {
  API.getPost(id).then(posts => {
    return dispatch(receivePosts([posts]));
  });
}

export const addPost = (title, body, author, category) => (dispatch) => {
  API.addPost(title, body, author, category).then(post => {
    dispatch({
      type: ADD_POST,
      post
    });
    dispatch(showPostDialog(false));
  });
};

export const updatePost = (id, title, body) => (dispatch) => (
  API.updatePost(id, title, body).then(post => {
    dispatch({
      type: UPDATE_POST,
      id,
      title: post.title,
      body: post.body
    });
    dispatch(showPostDialog(false));
  })
);

export const votePost = (post, option) => (dispatch) =>
  API.votePost(post.id, option).then((newPost) => (
    // only dispatching when update successful on backend
    post.voteScore !== newPost.voteScore && dispatch({
      type: VOTE_POST,
      id: post.id,
      option
    })
  ))

export const deletePost = (id) => (dispatch) =>
  API.deletePost(id).then(post =>
    post.deleted && dispatch({
      type: DELETE_POST,
      id
    })
  );

export const sortPost = (key, order) => (dispatch) => {
  dispatch(changeSortKey(key));
  dispatch(changeSortOrder(order));
  dispatch({
    type: SORT_POST,
    key,
    order
  });
};

export const changeSortKey = (key) => ({
  type: CHANGE_SORT_KEY,
  key
});

export const changeSortOrder = (order) => ({
  type: CHANGE_SORT_ORDER,
  order
});

export const showPostDialog = (isShow) => (dispatch) => {
  !isShow && dispatch(changeCurrentPost({}));
  dispatch({
    type: IS_SHOW_POST_DIALOG,
    isShow
  });
};

export const changeCurrentPost = (post) => (dispatch) => {
  dispatch({
    type: CHANGE_CURRENT_POST,
    post
  });
  dispatch(showPostDialog(true));
};