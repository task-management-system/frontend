import React from 'react';
import { connect } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import NotificationViewer from 'components/NotificationViewer';
import Auth from 'routing/Auth';
import Home from 'routing/Home';
import { State } from 'types/redux';

interface AppProps {}

const App: React.FC<AppProps & AppState> = ({ authorized }) => (
  <>
    <CssBaseline />
    <NotificationViewer />
    <Router>
      <Switch>
        <Route exact path="/auth" render={() => (authorized ? <Redirect to="/" /> : <Auth />)} />
        <Route path="*" render={() => (!authorized ? <Redirect to="/auth" /> : <Home />)} />
      </Switch>
    </Router>
  </>
);

const mapStateToProps = (state: State) => ({
  authorized: state.metaData.user !== null,
});

type AppState = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(App);
