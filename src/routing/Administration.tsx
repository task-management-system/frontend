import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { AdministrationMenu } from 'components/AdministrationMenu';
import Container from 'components/common/Container';
import Loading from 'components/Loading';
import Statistics from './Statistics';
import NoMatch from './NoMatch';

const User = React.lazy(() => import('./User'));
const Users = React.lazy(() => import('./administration/Users'));
const AddUser = React.lazy(() => import('./administration/add-user/AddUser'));
const Structure = React.lazy(() => import('./administration/Structure'));
const Roles = React.lazy(() => import('./administration/Roles'));
const AddRole = React.lazy(() => import('./administration/add-role/AddRole'));

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'grid',
    gridTemplateColumns: 'max-content 1fr',
  },
}));

const Administration: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AdministrationMenu />
      <Switch>
        <Route path="/administration" exact>
          <Container>
            <Statistics />
          </Container>
        </Route>
        <Route path="/administration/users">
          <React.Suspense fallback={<Loading />}>
            <Users />
          </React.Suspense>
        </Route>
        <Route path="/administration/user/:id">
          <React.Suspense fallback={<Loading />}>
            <User />
          </React.Suspense>
        </Route>
        <Route path="/administration/add-user">
          <React.Suspense fallback={<Loading />}>
            <AddUser />
          </React.Suspense>
        </Route>
        <Route path="/administration/structure">
          <React.Suspense fallback={<Loading />}>
            <Structure />
          </React.Suspense>
        </Route>
        <Route path="/administration/roles">
          <React.Suspense fallback={<Loading />}>
            <Roles />
          </React.Suspense>
        </Route>
        <Route path="/administration/add-role">
          <React.Suspense fallback={<Loading />}>
            <AddRole />
          </React.Suspense>
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
};

export default Administration;
