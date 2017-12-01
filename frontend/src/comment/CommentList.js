import React from 'react';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import CommentSort from './CommentSort';
import { connect } from 'react-redux';
import { changeCurrentComment, deleteComment } from '../comment/actions';
import OnePost from '../components/OnePost';

const styles = theme => ({
  paper: {
    margin: '20px 0',
    padding: '0 10px'
  }
});

const CommentList = (props) => {
  const { classes, comments, handleVote, changeCurrentComment, deleteComment } = props;
  return (
    <div>
      <CommentSort commentsNum={comments.length} />
      <Paper className={classes.paper}>
        {comments.map(comment => (
          <OnePost
            key={comment.id}
            onepost={comment}
            handleVote={handleVote}
            changeCurrent={changeCurrentComment}
            deleteP={deleteComment}
          />
        ))}
      </Paper>
    </div>
  )
};

const mapDispatchToProps = (dispatch) => ({
  changeCurrentComment: (comment) => dispatch(changeCurrentComment(comment)),
  deleteComment: (id) => {
    window.confirm('really delete this comment ?')
      && dispatch(deleteComment(id))
  }
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(CommentList));