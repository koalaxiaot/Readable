import React from 'react';
import { connect } from 'react-redux';
import { Paper, withStyles, TableSortLabel } from 'material-ui';
import { sortComment } from './actions';

const styles = theme => ({
  orderPaper: {
    padding: '5px 10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  label: {
    padding: '10px'
  },
  bold: {
    fontWeight: 'bold'
  }
});

const CommentSort = (props) => {

  const { classes, commentsNum, sortComment, sortKey, sortOrder } = props;

  return (
    <Paper className={classes.orderPaper}>
      <span>
        <TableSortLabel
          className={classes.label}
          active={sortKey === 'timestamp'}
          direction={sortOrder}
          onClick={() => sortComment('timestamp', sortOrder === 'desc' ? 'asc' : 'desc')}
        >
          <span className={sortKey === 'timestamp' ? classes.bold : ''}>time</span>
        </TableSortLabel>
        <TableSortLabel
          className={classes.label}
          active={sortKey === 'voteScore'}
          direction={sortOrder}
          onClick={() => sortComment('voteScore', sortOrder === 'desc' ? 'asc' : 'desc')}
        >
          <span className={sortKey === 'voteScore' ? classes.bold : ''}>score</span>
        </TableSortLabel>
      </span>
      <span>number of comments: {commentsNum}</span>
    </Paper>
  )

};

const mapStateToProps = ({ comments }) => ({
  sortKey: comments.sortKey,
  sortOrder: comments.sortOrder
});

const mapDispatchToProps = (dispatch) => ({
  sortComment: (key, order) => dispatch(sortComment(key, order))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CommentSort));