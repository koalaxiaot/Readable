import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Typography, withStyles } from 'material-ui';
import PostList from '../post/PostList';
import PostDialog from '../post/PostDialog';
import AddBtn from '../components/AddBtn';

const styles = theme => ({
  paper: {
    marginBottom: '10px',
    padding: '16px',
    color: '#666'
  }
});

const Category = (props) => {
  const { match, classes } = props;
  return (
    <div>
      <Paper className={classes.paper}>
        <Typography color="inherit">
          <Link to="/">Home</Link> / {match.params.category}
        </Typography>
      </Paper>

      <PostList catFilter={match.params.category} />

      <AddBtn isPost />
      <PostDialog />

    </div >
  );
}

export default withStyles(styles)(Category);