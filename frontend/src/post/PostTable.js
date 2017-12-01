import React from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow, TableSortLabel } from 'material-ui/Table';
import { dateFormat } from '../utils/helper'
import { Link } from 'react-router-dom';

const PostTable = (props) => {

  const { posts, sortKey, sortOrder, changeSortHandler } = props;

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
          </TableRow>
        ))}
      </TableBody>
    </Table>

  )
};

export default PostTable;