import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import User from './User';
import NoMatch from './NoMatch';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}));

const Home: React.FC = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Switch>
        <Route path="/user/:id">
          <User />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
};

export default Home;
