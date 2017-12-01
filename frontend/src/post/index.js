import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles, Paper, Typography } from 'material-ui';
import { voteComment, fetchComments } from '../comment/actions';
import CommentDialog from '../comment/CommentDialog';
import CommentList from '../comment/CommentList';
import AddBtn from '../components/AddBtn';
import { fetchOnePost, votePost } from './actions';
import PostDetail from './PostDetail';
import PostDialog from './PostDialog';

const styles = theme => ({
  paper: {
    padding: '16px'
  }
});

class Post extends Component {

  handleVote = (t, c, option) => {
    t === 'post' && this.props.votePost(c, option);
    t === 'comment' && this.props.voteComment(c, option);
  }

  componentDidMount() {
    const { match } = this.props;
    this.props.fetchOnePost(match.params.post_id);
    this.props.fetchComments(match.params.post_id);
  }

  render() {
    const { post, classes, match, comments, history } = this.props
    return (
      <div>
        {post && post.id
          ? <div>

            <Paper className={classes.paper}>
              <Typography color="inherit">
                <Link to="/">Home</Link> / <Link to={`/${match.params.category}`}>{match.params.category}</Link> / {post.title}
              </Typography>
            </Paper>

            <PostDetail post={post} handleVote={this.handleVote} history={history} />
            <CommentList comments={comments} handleVote={this.handleVote} />

            <AddBtn isComment isPost />
            <PostDialog />
            <CommentDialog parentId={post.id} />

          </div>
          : null}
      </div >
    );
  }
}

const mapStateToProps = ({ posts, comments }) => ({
  post: posts.posts[0],
  ...comments
});

const mapDispatchToProps = (dispatch) => ({
  fetchOnePost: (post_id) => dispatch(fetchOnePost(post_id)),
  fetchComments: (post_id) => dispatch(fetchComments(post_id)),
  votePost: (post, option) => dispatch(votePost(post, option)),
  voteComment: (comment, option) => dispatch(voteComment(comment, option))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Post));