import React from 'react';
import { connect } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import NotificationViewer from 'components/NotificationViewer';
import Auth from 'routing/Auth';
import Home from 'routing/Home';
import { TState } from 'types/redux';

interface IAppProps {}

const App: React.FC<IAppProps & TAppState> = ({ authorized }) => (
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

const mapStateToProps = (state: TState) => ({
  authorized: state.metaData.user !== null,
});

type TAppState = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(App);
