const serverUrl = process.env.REACT_APP_BACKEND || 'http://localhost:3001';

const token = localStorage.token ? localStorage.token : localStorage.token = Math.random().toString(36).substr(-8);
const headers = {
  'Accept': 'application/json',
  'Authorization': token
};

export const getCategories = () =>
  fetch(`${serverUrl}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

export const getCPosts = (category) =>
  fetch(`${serverUrl}/${category}/posts`, { headers })
    .then(res => res.json());

export const getPosts = () =>
  fetch(`${serverUrl}/posts`, { headers })
    .then(res => res.json());

export const getPost = (id) =>
  fetch(`${serverUrl}/posts/${id}`, { headers })
    .then(res => res.json());

export const addPost = (title, body, author, category) => {
  const id = Math.random().toString(36).substr(-8);
  const timestamp = (new Date()).getTime();
  return fetch(`${serverUrl}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, timestamp, body, author, category, title })
  }).then(res => res.json());
};

export const votePost = (id, option) =>
  fetch(`${serverUrl}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res.json());

export const updatePost = (id, title, body) => {
  return fetch(`${serverUrl}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, body })
  }).then(res => res.json());
};

export const deletePost = (id) => {
  return fetch(`${serverUrl}/posts/${id}`, {
    method: 'DELETE',
    headers
  }).then(res => res.json());
};

export const getComments = (post_id) =>
  fetch(`${serverUrl}/posts/${post_id}/comments`, { headers })
    .then(res => res.json());

export const voteComment = (id, option) =>
  fetch(`${serverUrl}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res.json());

export const addComment = (body, author, parentId) => {
  const id = Math.random().toString(36).substr(-8);
  const timestamp = (new Date()).getTime();
  return fetch(`${serverUrl}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, timestamp, body, author, parentId })
  }).then(res => res.json());
};

export const updateComment = (id, body, timestamp) => {
  return fetch(`${serverUrl}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ timestamp, body })
  }).then(res => res.json());
};

export const deleteComment = (id) => {
  return fetch(`${serverUrl}/comments/${id}`, {
    method: 'DELETE',
    headers
  }).then(res => res.json());
};