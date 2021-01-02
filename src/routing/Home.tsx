import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NoMatch from './NoMatch';

const User = () => <p>User page</p>;

const Home: React.FC = props => {
  return (
    <Switch>
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
