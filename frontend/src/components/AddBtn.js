import React from 'react';
import { withStyles, Button } from 'material-ui';
import AddIcon from 'material-ui-icons/Add';
import { connect } from 'react-redux';
import { showCommentDialog } from '../comment/actions';
import { showPostDialog } from '../post/actions';
import { fetchCategory } from '../category/actions';

const styles = theme => ({
  container: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    margin: theme.spacing.unit
  }
});

const AddBtn = (props) => {

  const { classes, isPost, isComment, showCommentDialog, showPostDialog } = props;

  return (

    <div className={classes.container}>
      {isPost &&
        <Button fab color="accent" className={classes.button} title="Add Post" onClick={() => showPostDialog()}>
          <AddIcon />
        </Button>
      }
      {isComment &&
        <Button fab color="primary" className={classes.button} title="Add Comment" onClick={() => showCommentDialog()}>
          <AddIcon />
        </Button>
      }
    </div >

  )

};

const mapDispatchToProps = (dispatch) => ({
  showCommentDialog: () => dispatch(showCommentDialog(true)),
  showPostDialog: () => { dispatch(fetchCategory()); dispatch(showPostDialog(true)) },
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(AddBtn));