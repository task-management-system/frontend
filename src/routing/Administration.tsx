import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Typography, makeStyles } from '@material-ui/core';
import AdministrationMenu from 'components/AdministrationMenu/AdministrationMenu';
import Container from 'components/common/Container';
import Loading from 'components/Loading';
import NoMatch from './NoMatch';

const Users = React.lazy(() => import('./administration/Users'));
const User = React.lazy(() => import('./User'));
const AddUser = React.lazy(() => import('./administration/AddUser'));
const Structure = React.lazy(() => import('./administration/Structure'));
const Roles = React.lazy(() => import('./administration/Roles'));

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
            <Typography variant="h3">Administration</Typography>
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
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
};

export default Administration;
