import React from 'react';
import { ThumbUp, ThumbDown } from 'material-ui-icons';
import { Button, withStyles } from 'material-ui';

const styles = theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  button: {
    display: 'block',
    minWidth: '60px'
  },
  buttonScore: {
    color: '#666',
    display: 'block'
  }
});

const Voter = (props) => {
  const { post, classes, handleVote } = props;
  return (
    <div className={classes.container}>
      <Button className={classes.button} onClick={() => handleVote(post.title ? 'post' : 'comment', post, 'upVote')}>
        <ThumbUp />
      </Button>
      <Button disabled className={classes.buttonScore}>
        {post.voteScore}
      </Button>
      <Button className={classes.button} onClick={() => handleVote(post.title ? 'post' : 'comment', post, 'downVote')}>
        <ThumbDown />
      </Button>
    </div >
  )
}

export default withStyles(styles)(Voter);