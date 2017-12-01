import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles, Paper, Button, Divider } from 'material-ui';
import { fetchCategory } from '../category/actions';
import PostList from '../post/PostList';
import AddBtn from '../components/AddBtn';
import PostDialog from '../post/PostDialog';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  paper: {
    marginBottom: '10px'
  }
});

class Home extends Component {

  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    const { categories, classes } = this.props;
    return (
      <div>
        <Paper className={classes.paper}>
          {categories.map(c => (
            <Button component={Link} to={`/${c.path}`} key={c.name} className={classes.button} color="primary">{c.name}</Button>
          ))}
        </Paper>
        <Divider />
        <PostList />

        <AddBtn isPost />
        <PostDialog />
      </div>
    )
  }

}

const mapStateToProps = ({ categories }) => ({
  categories
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(fetchCategory())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));