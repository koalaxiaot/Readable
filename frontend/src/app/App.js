import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { withStyles, Grid } from 'material-ui';
import AppHeader from './AppHeader';
import Home from '../home';
import Category from '../category';
import Post from '../post';

const styles = theme => ({
  content: {
    marginTop: 80
  }
});

const App = (props) => {
  const { classes } = props;
  return (
    <BrowserRouter>
      <div>
        <AppHeader />
        <Grid container className={classes.content}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <Route exact path="/" component={Home} />
            <Route exact path="/:category" component={Category} />
            <Route path="/:category/:post_id" component={Post} />
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </div>
    </BrowserRouter>
  );
}

export default withStyles(styles)(App);