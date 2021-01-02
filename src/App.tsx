import React from 'react';
import { connect } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Auth from 'routing/Auth';
import Home from 'routing/Home';
import { TState } from 'redux/types';

interface IProps {
  authorized: boolean;
}

const App: React.FC<IProps> = props => (
  <>
    <CssBaseline />
    <Router>
      <Switch>
        <Route
          exact
          path="/auth"
          render={() => (props.authorized ? <Redirect to="/" /> : <Auth />)}
        />
        <Route path="*" render={() => (!props.authorized ? <Redirect to="/auth" /> : <Home />)} />
      </Switch>
    </Router>
  </>
);

const mapStateToProps = (state: TState) => ({
  authorized: state.metaData.authorized,
});

export default connect(mapStateToProps)(App);
