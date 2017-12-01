import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import posts from './post/reducers'
import categories from './category/reducers'
import comments from './comment/reducers'
import { username, is_fetching } from './app/reducers'

const reducers = combineReducers({
  posts,
  categories,
  comments,
  username,
  is_fetching
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

console.log('init:', store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);