import React from 'react';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { changeCurrentPost, deletePost } from '../post/actions';
import { withRouter } from 'react-router';
import OnePost from '../components/OnePost';

const styles = theme => ({
  paper: {
    margin: '20px 0',
    padding: '0 10px'
  }
});

const PostDetail = (props) => {
  const { classes, post, handleVote, changeCurrentPost, deletePost } = props;
  return (
    <Paper className={classes.paper}>
      <OnePost
        onepost={post}
        handleVote={handleVote}
        changeCurrent={changeCurrentPost}
        deleteP={deletePost}
      />
    </Paper >
  )
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeCurrentPost: (post) => { dispatch(changeCurrentPost(post)) },
  deletePost: (id) => {
    window.confirm('really deleted?')
      && dispatch(deletePost(id))
      && ownProps.history.push(`/${ownProps.post.category}`)
  }
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(withRouter(PostDetail)));