import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './Main';
import Role from './Role';
import User from './User';
import NoMatch from './NoMatch';
import { getUsers } from 'api/v1';

const Home: React.FC = props => {
  getUsers().then(console.log);

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
