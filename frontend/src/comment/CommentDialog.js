import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import { Button, TextField } from 'material-ui';
import { showCommentDialog, addComment, updateComment } from './actions';

class CommentDialog extends Component {

  render() {
    const { handleClose, handleAdd, handleUpdate, username, isOpen, parentId, currentComment } = this.props;

    return (
      <div>
        <Dialog open={isOpen} onRequestClose={handleClose} ignoreBackdropClick ignoreEscapeKeyUp>
          <DialogTitle>COMMENT</DialogTitle>
          <DialogContent>
            <DialogContentText>
              写下你想说的话吧。Please write down what you want to say.
            </DialogContentText>
            {currentComment.id
              ? <TextField autoFocus fullWidth multiline rows="6" inputRef={(t) => this.t = t} defaultValue={currentComment.body} />
              : <TextField autoFocus fullWidth multiline rows="6" inputRef={(t) => this.t = t} />
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            {currentComment.id
              ? <Button onClick={() => handleUpdate(currentComment.id, this.t.value)} color="primary">Submit</Button>
              : <Button onClick={() => handleAdd(this.t.value, username, parentId)} color="primary">Submit</Button>
            }
          </DialogActions>
        </Dialog>
      </div>
    )
  }
};

const mapStateToProps = ({ comments, username }) => ({
  isOpen: comments.isShowCommentDialog,
  username,
  currentComment: comments.currentComment
});

const mapDispatchToProps = (dispatch) => ({
  handleClose: () => dispatch(showCommentDialog(false)),
  handleAdd: (body, author, parentId) => dispatch(addComment(body, author, parentId)),
  handleUpdate: (body, id) => dispatch(updateComment(body, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentDialog);