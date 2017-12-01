import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import { withStyles, Button, TextField } from 'material-ui';
import { showPostDialog, addPost, updatePost } from './actions';

const styles = theme => ({
  select: {
    height: '35px',
    margin: '15px 0',
    minWidth: '140px',
    background: '#fff',
    fontSize: '16px',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
  }
});

class PostDialog extends Component {

  render() {

    const { handleClose, handleAdd, handleUpdate, isOpen, categories, username, currentPost, classes } = this.props;

    return (
      <div>
        <Dialog open={isOpen} onRequestClose={handleClose} ignoreBackdropClick ignoreEscapeKeyUp>
          <DialogTitle>POST</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Welcome to my page!
            </DialogContentText>

            {currentPost.id
              ? null
              : <select ref={t => this.category = t} className={classes.select}>
                {categories.map(c => (
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
              </select>
            }

            {currentPost.id
              ? <TextField label="Title" autoFocus fullWidth inputRef={(t) => this.title = t} defaultValue={currentPost.title} />
              : <TextField label="Title" autoFocus fullWidth inputRef={(t) => this.title = t} />
            }
            {currentPost.id
              ? <TextField label="Content" fullWidth multiline rows="6" inputRef={(t) => this.body = t} defaultValue={currentPost.body} />
              : <TextField label="Content" fullWidth multiline rows="6" inputRef={(t) => this.body = t} />
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            {currentPost.id
              ? <Button onClick={() => handleUpdate(currentPost.id, this.title.value, this.body.value)} color="primary">Submit</Button>
              : <Button onClick={() => handleAdd(this.title.value, this.body.value, username, this.category.value)} color="primary">Submit</Button>
            }
          </DialogActions>
        </Dialog>
      </div>
    )
  }
};

const mapStateToProps = ({ posts, username, categories }) => ({
  isOpen: posts.isShowPostDialog,
  username,
  currentPost: posts.currentPost,
  categories
});

const mapDispatchToProps = (dispatch) => ({
  handleClose: () => dispatch(showPostDialog(false)),
  handleAdd: (title, body, author, category) => dispatch(addPost(title, body, author, category)),
  handleUpdate: (id, title, body) => dispatch(updatePost(id, title, body))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PostDialog));