/** component show one post or comment */
import React from 'react';
import { Button, Typography, Grid, withStyles } from 'material-ui';
import Voter from './Voter';
import { dateFormat } from '../utils/helper';

const styles = theme => ({
  grid: {
    borderBottom: 'solid 1px #aaa',
    marginTop: '8px'
  },
  left: {
    borderRight: 'solid 1px #ccc',
    display: 'flex',
    justifyContent: 'center'
  },
  right: {
    paddingLeft: '20px'
  },
  header: {
    lineHeight: '35px',
    paddingBottom: '5px',
    borderBottom: 'solid 1px #ccc',
    display: 'flex',
    justifyContent: 'space-between'
  },
  content: {
    padding: '20px'
  },
});

const OnePost = (props) => {

  const { classes, onepost, handleVote, changeCurrent, deleteP } = props;

  return (
    <Grid container key={onepost.id} className={classes.grid}>
      <Grid item xs={1} className={classes.left}>
        <Voter post={onepost} handleVote={handleVote} />
      </Grid>
      <Grid item xs={11}>
        <Typography className={classes.header}>
          <span><b>{onepost.author}</b> @ {dateFormat(onepost.timestamp)}</span>
          <span>
            <Button onClick={() => changeCurrent(onepost)}>edit</Button>
            <Button onClick={() => deleteP(onepost.id)}>delete</Button>
          </span>
        </Typography>
        <Typography className={classes.content} dangerouslySetInnerHTML={{ __html: ('' + onepost.body).replace(/(?:\r\n|\r|\n)/g, '<br />') }} />
      </Grid>
    </Grid>
  )

};

export default withStyles(styles)(OnePost);