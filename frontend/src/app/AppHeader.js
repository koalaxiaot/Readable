import React from 'react';
import { withStyles, AppBar, Typography } from 'material-ui';
import ToolBar from 'material-ui/Toolbar';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeUsername } from './actions';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
  flex: {
    flex: 1
  },
  user: {
    color: '#fff',
    width: '150px',
    marginLeft: '20px',
    border: 'none',
    background: 'transparent',
    height: '30px',
    fontSize: '18px',
    borderBottom: 'solid 1px #eee'
  }
});

const AppHeader = (props) => {
  const { classes, changeUsername, username } = props;
  return (
    <div className={classes.root}>
      <AppBar>
        <ToolBar>
          <Typography type="title" color="inherit" component={Link} to="/" className={classes.flex}>Readable</Typography>
          Hello, <input onChange={() => changeUsername(this.text.value)} className={classes.user} ref={t => this.text = t} value={username} />
        </ToolBar>
      </AppBar>
    </div>
  )
};

const mapStateToProps = ({ username }) => ({
  username
});

const mapDispatchToProps = (dispatch) => ({
  changeUsername: (name) => dispatch(changeUsername(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AppHeader));