import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import NotificationViewer from 'components/NotificationViewer';
import Auth from 'routing/Auth';
import Home from 'routing/Home';
import { State } from 'types/redux';

const App: React.FC<ConnectedAppProps> = ({ authorized }) => (
  <>
    <CssBaseline />
    <Router>
      <Switch>
        <Route exact path="/auth" render={() => (authorized ? <Redirect to="/" /> : <Auth />)} />
        <Route path="*" render={() => (!authorized ? <Redirect to="/auth" /> : <Home />)} />
      </Switch>
    </Router>
    <NotificationViewer />
  </>
);

const mapStateToProps = (state: State) => ({
  authorized: state.metaData.user !== null,
});

const connector = connect(mapStateToProps);

type ConnectedAppProps = ConnectedProps<typeof connector>;

export default connector(App);
