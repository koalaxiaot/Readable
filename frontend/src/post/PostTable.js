import React from 'react';
import { connect } from 'react-redux';
import Table, { TableBody, TableCell, TableHead, TableRow, TableSortLabel } from 'material-ui/Table';
import { IconButton } from 'material-ui';
import { ThumbUp, ThumbDown } from 'material-ui-icons';
import { Link } from 'react-router-dom';
import { votePost, changeCurrentPost, deletePost } from '../post/actions';
import { dateFormat } from '../utils/helper'
import { ModeEdit, Delete } from 'material-ui-icons';

const PostTable = (props) => {

  const { posts, sortKey, sortOrder, changeSortHandler, changeCurrentPost, deletePost, votePost } = props;

  return (
    <Table>
      <TableHead>
        <TableRow>

          <TableCell>
            <TableSortLabel
              active={sortKey === 'timestamp'}
              direction={sortOrder}
              onClick={() => changeSortHandler('timestamp')}
            >Time</TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={sortKey === 'voteScore'}
              direction={sortOrder}
              onClick={() => changeSortHandler('voteScore')}
            >Vote Score</TableSortLabel>
          </TableCell>

          <TableCell>Title</TableCell>
          <TableCell>Comments</TableCell>
          <TableCell>Author</TableCell>
          <TableCell>#</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {posts.map(post => (
          <TableRow key={post.id}>
            <TableCell>{dateFormat(post.timestamp)}</TableCell>
            <TableCell>{post.voteScore}</TableCell>
            <TableCell>
              <Link to={`/${post.category}/${post.id}`}>[{post.category}] {post.title}</Link>
            </TableCell>
            <TableCell>{post.commentCount}</TableCell>
            <TableCell>{post.author}</TableCell>
            <TableCell>
              <IconButton color="primary" onClick={() => changeCurrentPost(post)}>
                <ModeEdit />
              </IconButton>
              <IconButton color="accent" onClick={() => deletePost(post.id)}>
                <Delete />
              </IconButton>
              <IconButton onClick={() => votePost(post, 'upVote')}>
                <ThumbUp />
              </IconButton>
              <IconButton onClick={() => votePost(post, 'downVote')}>
                <ThumbDown />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

  )
};

const mapDispatchToProps = (dispatch) => ({
  changeCurrentPost: (post) => { dispatch(changeCurrentPost(post)) },
  deletePost: (id) => {
    window.confirm('really deleted?') && dispatch(deletePost(id))
  },
  votePost: (post, option) => dispatch(votePost(post, option)),
});

export default connect(null, mapDispatchToProps)(PostTable);