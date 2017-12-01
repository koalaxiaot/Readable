import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCatPosts, fetchPosts, sortPost } from '../post/actions'
import Paper from 'material-ui/Paper';
import PostTable from './PostTable';

class PostListC extends Component {

  changeSortHandler = (key) => {
    const { sortPost, sortOrder } = this.props;
    sortPost(key, sortOrder === 'desc' ? 'asc' : 'desc');
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const { posts, sortKey, sortOrder } = this.props;
    return (
      <div>
        <Paper>
          <PostTable
            posts={posts}
            sortKey={sortKey}
            sortOrder={sortOrder}
            changeSortHandler={this.changeSortHandler}
          />
        </Paper>
      </div>
    )
  }

}

const mapStateToProps = ({ posts, categories }, ownProps) => {
  return ({
    posts: posts.posts.filter(post => (!ownProps.catFilter ? true : post.category === ownProps.catFilter ? true : false)),
    sortKey: posts.sortKey,
    sortOrder: posts.sortOrder
  })
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchPosts: () => !ownProps.catFilter ? dispatch(fetchPosts()) : dispatch(fetchCatPosts(ownProps.catFilter)),
  sortPost: (key, order) => dispatch(sortPost(key, order))
});

const PostList = connect(mapStateToProps, mapDispatchToProps)(PostListC);

export default PostList;