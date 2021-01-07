import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './Main';
import Role from './Role';
import User from './User';
import NoMatch from './NoMatch';

const Home: React.FC = props => {
  return (
    <Switch>
      <Route path="/" exact>
        <Main />
      </Route>
      <Route path="/role">
        <Role />
      </Route>
      <Route path="/user/:id">
        <User />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
};

export default Home;
